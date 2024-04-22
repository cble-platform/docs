# How it Works

## Design

The CBLE server is designed to connect to many different providers at once. In doing so, a main go routine monitoring all
incoming [registration requests](#registration) wait for registrations. Once one is received, a new go routine is spawned
with a client to connect to that provider's gRPC server.

<figure markdown>
  ![gRPC design diagram](grpc_diagram.jpg){ width="100%" }
  <figcaption>CBLE Provider gRPC Design</figcaption>
</figure>

## Loading Providers

To load providers into CBLE, you must provide a Git remote, tag (version), and name for the provider. This will be used
to fetch and compile the provider into the provider cache.

The basic flow of loading CBLE providers is as follows:

```mermaid
flowchart
  init["Initialize Provider"]
  init-- Exists in provider cache -->checkGitTag
  init-- Doesn't exist in provider cache -->clone
  checkGitTag["Inspect checked out git tag (version)<br />"]
  checkGitTag-- Doesn't match expected version -->checkoutVersion
  checkGitTag-- Matches expected version -->runProvider
  clone["Clone from git"]
  clone-->checkoutVersion
  checkoutVersion["Checkout requested tag (version)"]
  checkoutVersion-->runProvider
  runProvider["Run provider in runtime environment"]
  linkStyle 0,3 color:green;
  linkStyle 1,2 color:red;
```

This flow is triggered on startup for CBLE for any pre-existing providers in the database and can be triggered manually
by calling the `loadProvider` GraphQL mutation.

## Runtime

Providers use one of two supported runtime environments: `docker` or `shell`. This is configured using the `type` value
in the `cble-metadata.yml` file located in the root of the provider.

```yaml title="Example of cble-metadata.yml from provider-openstack"
# From https://github.com/cble-platform/provider-openstack/blob/main/cble-metadata.yml

name: provider-openstack
description: Builder that interfaces with Openstack
author: Bradley Harker <github.com/BradHacker>
version: v1.0.0-alpha

type: docker

docker:
dockerfile: Dockerfile
cmd: ./provider_openstack
```

For more information on writing a `cble-metadata.yml` file, see [Writing a Provider](./writing-a-provider.md#metadata).

## Registration

Providers, on startup, will register themselves with the CBLE server in order to establish a peristent gRPC connection.
This process also prevents rogue providers from starting up without knowing the provider ID ahead of time.

After an initial handshake process, the provider will start up its own gRPC server which can be used to provider commands
to the provider. This process is as follows:

```mermaid
sequenceDiagram
  autonumber
  participant C as CBLE gRPC Server
  participant P as Provider gRPC Client

  note over P: Startup

  critical Checks protocol versions
    P->>C: Handshake(client_version)
    C->>P: HandshakeReply(server_version)
  option Versions don't match
    note over C,P: Connection Terminated
  end

  P->>C: RegisterProvider(id, name, version, features)
  note over C: Store provider [id], name, and version
  C->>P: RegisterReply(status, socket_id)
  note over P: Start provider gRPC server
  note over C: Connect to provider on<br />/tmp/cble-provider-[id].sock
```

## Commands

As of now, there are a few pre-defined commands the CBLE server can issue to providers. These are `Configure`, `Deploy`,
and `Destroy`.

These commands are issued via the gRPC provider client for the specified provider. Very rarely will you have to directly
interact with these as they are abstracted by GraphQL mutations within the CBLE API.

### `Configure`

This command is used to reload the configuration of a provider without having to restart the provider itself.
Configurations are stored within the CBLE database for portability and because of this, this command is executed on each
startup of the providers.

### `Deploy`

This command deploys a given blueprint. The deployment state and any variables stored are returned to CBLE as maps.

!!! note

    This command will eventually return a gRPC stream in order to provider real-time feedback on deployment progress.
    You can track the progress of that [here](https://github.com/cble-platform/cble-backend/issues/22).

### `Destroy`

This command destroys a given deployment. The deployment state and any variables stored are returned to CBLE as maps.

!!! note

    This command will eventually return a gRPC stream in order to provider real-time feedback on deployment progress.
    You can track the progress of that [here](https://github.com/cble-platform/cble-backend/issues/22).

## Unregistration

Unregistration occurs when a provider is ready to shutdown and would like to do so gracefully. Without this, the gRPC
clients created by the CBLE server would panic. To accomplish this, the provider will send an unregister request to the
CBLE server (using it's gRPC client) and then will gracefully shutdown it's gRPC server, disconnecting all clients in
the process.

```mermaid
sequenceDiagram
  autonumber
  participant C as CBLE gRPC Server
  participant P as Provider gRPC Client

  P->>C: UnregisterProvider(id, name, version)
  note over C: Send shutdown signal to<br />provider client routine
  C->>P: UnregisterReply(status)
  note over P: Gracefully shutdown gRPC server
```
