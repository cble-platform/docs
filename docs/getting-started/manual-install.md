# Manual Installation

## Dockerized (Recommended)

### Prerequisites

Install [Docker](https://docker.com) with:

```shell
curl -fsSL https://get.docker.com/ | sh
```

### Install CBLE

To get started, clone the CBLE repository:

```shell
git clone https://github.com/cble-platform/cble
```

Move into the deploy directory and create local configuration files from the provided examples:

```shell
cd cble
cp config.example.yaml config.local.yaml
cp Caddyfile.example Caddyfile
cp docker-compose.yml docker-compose.local.yml
```

## Host-based Installation

Coming soon.

<!--
### Install Prerequisites

- Install [Golang 1.21.x](https://go.dev/doc/install)
- Install [PostgreSQL 15.x](https://www.postgresql.org/download/)
- Install [Redis](https://redis.io/docs/install/install-redis/)

### Configure PostgreSQL

#### Create a User

Create a user for CBLE to use in PostgreSQL with a password:

```shell
sudo -u postgres createuser --interactive --pwprompt <username>
```

> You can generate a secure password with `pwgen -s 25 1`

### Create a local config

Copy the example configuration file to create a local version:

```shell
cp config.yaml config.local.yaml
```

Now, fill in the credentials for this newly created user in the `config.local.yaml`:

```yaml
# ...
database:
  username: <username>
  password: <password>
  host: 127.0.0.1 # (1)!
  ssl: false # (2)!
# ...
```

1. If you installed PostgreSQL on a different host than this one, set its IP address here
2. You can configure PostgreSQL to use SSL/TLS by following [this guide](https://www.postgresql.org/docs/current/ssl-tcp.html).
   If you do, make sure you set `ssl: true`
-->
