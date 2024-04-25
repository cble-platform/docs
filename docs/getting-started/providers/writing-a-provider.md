# Writing a Provider

## Provider Template

Get started with the official CBLE Provider repository template:

[Get Provider Template :material-chevron-right:](https://github.com/new?template_name=provider-template&template_owner=cble-platform){ .md-button .md-button--primary target="\_blank" }

## Metadata

Metadata files let CBLE know how to install, build, and execute providers at runtime. As of writing, providers only
support 2 modes of operation: `docker` and `shell`. All of this information should be located in a file called
`cble-metadata.yaml` in the root of your provider repository.

Providers need to support some basic fields to describe the provider overall. Here’s an example from [provider-openstack](https://github.com/cble-platform/provider-openstack):

```yaml
name: provider-openstack
description: Builder that interfaces with Openstack
author: Bradley Harker <github.com/BradHacker>
version: v1.0.0-alpha

type: docker # docker, shell
```

### Provider Types

For each provider type, you must specify the respective block within your `cble-metadata.yaml`:

#### Docker

The `docker` runtime builds a container image and executes the provider in a Docker container.

```yaml title="Provider docker metadata options"
docker:
  dockerfile: <location of the provider dockerfile>
  cmd: <command to run provider> # the ID will be passed as the last positional argument
```

#### Shell

The `shell` runtime executes a provider as a subprocess and requires installing prerequisites via command hooks.

```yaml title="Provider shell metadata options"
shell:
  prebuild_cmd: <commands to install prerequisites (optional)>
  build_cmd: <commands to build provider binary>
  exec_cmd: <command to run provider> # the ID will be passed as the last positional argument
```
