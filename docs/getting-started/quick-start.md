# Getting Started

!!! warning "🚧 Under Construction 🚧"

    This is **NOT** recommended for use in a production environment at the
    current state. Please check back later for production-ready deployment.

## Quick Start

To get started, clone the deployment repository:

```shell
git clone --recursive https://github.com/cble-platform/deploy cble-deploy
```

Move into the deploy directory and duplicate the main config example file:

```shell
cd cble-deploy
cp config.example.yaml config.local.yaml
```

You can now modify the `config.local.yaml` file with your specific configuration (see
[Config File Reference](../references/configuration/config-file.md) for more).

Place your production domain at the top of the `Caddyfile`:

```text title="Caddyfile"
<your domain here> {
    # ...
}
```

You should now be able to run CBLE:

```shell
docker compose up -d
```
