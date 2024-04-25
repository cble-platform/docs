# Providers

Providers in CBLE are the link between CBLE Blueprints and the "real world" (aka. the cloud). CBLE Providers are designed
to be standalone binaries which use [gRPC](https://grpc.io/) for inter-process communication (IPC). This IPC is done via
a local unix socket and can optionally be secure with TLS (not currently supported).

## Supported Providers

A list of official providers is here:

- [cble-platform/provider-openstack](https://github.com/cble-platform/provider-openstack) (`https://github.com/cble-platform/provider-openstack`)

You can also provider your own provider if you'd like. See [Writing a Provider](./writing-a-provider.md) section for more
information.
