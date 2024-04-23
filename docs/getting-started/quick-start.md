# Quick Start

!!! info "Base OS Selection"

    This deployment has only been tested on **Fedora 38/39** and **Ubuntu 22.04**

## Install

Use the auto-installer to download CBLE and its prerequisites:

```shell
curl -fsSL https://get.cble.io | sh
```

## Configure

For these next steps you'll need to know the Fully Qualified Domain Name (FQDN) of the deployment. This
would look something like `https://docs.cble.io`.

!!! tip "FQDN Configuration"

    The FQDN *must* have DNS set up in order to perform automatic TLS certificate provisioning. Be sure
    to set up your DNS `A/AAAA` records to point to the CBLE server.

First, edit the `config.local.yaml` file (see
[Config File Reference](../references/config-file.md) for more options):

```yaml title="config.local.yaml"
# ...
server:
  hostname: localhost
  # ...
  ssl: false
  # ...
  origins:
    - https://<your fqdn> # put your FQDN here
# ...
database:
  # ...
  password: cb<secure password>le # set this to a secure password for the database
# ...
auth:
  jwt_key: <random jwt key> # generate a random value here
  # (easy method; requires node) node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
  # ...
initialization:
  default_admin:
    # ...
    password: <secure password> # generate a secure password for the default admin user
  # ...
```

Place your FQDN at the top of the `Caddyfile`:

```text title="Caddyfile"
<your fqdn> { # be sure to delete the "http://" at the beginning
    # ...
}
```

Update the configuration in the `docker-compose.local.yml`:

```yaml title="docker-compose.local.yaml"
services:
  frontend:
    build:
      # ...
      args:
        - VITE_API_BASE_URL=https://<your fqdn> # put your FQDN here
    # ...
  backend:
    # ...
  db:
    # ...
    environment:
      # ...
      - POSTGRES_PASSWORD=<secure password> # secure password from the `database` section of `config.local.yaml`
      # ...
```

## Deploy

Build the container images locally:

```shell
docker compose -f docker-compose.local.yml build
```

Finally, run CBLE in the background (may take a minute on first boot):

```shell
docker compose -f docker-compose.local.yml up -d
```

You can now visit the CBLE dashboard at `https://<your fqdn>` and log in with the username `cble` and the
secure password you created in `config.local.yaml`.
