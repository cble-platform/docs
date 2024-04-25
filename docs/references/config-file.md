# Config File

!!! note

    All defaults are pulled from the `config.example.yaml` file. For instructions on configuring production environments
    see [Installation - Configuration](../getting-started/installation.md#configuration).

## Global Options

> Applies to all components of CBLE

| Option  |  Type   | Default | Description                              |
| :-----: | :-----: | :-----: | :--------------------------------------- |
| `debug` | Boolean | `false` | Enables/disables low level debug logging |

## `server`

> Configures the CBLE webserver

|       Option        |   Type   |                       Default                       | Description                                                                              |
| :-----------------: | :------: | :-------------------------------------------------: | :--------------------------------------------------------------------------------------- |
|     `hostname`      |  String  |                     `localhost`                     | The FQDN of the server                                                                   |
|       `port`        |  String  |                       `8080`                        | The webserver port (must match `Caddyfile` `/api` route)                                 |
|        `ssl`        | Boolean  |                       `false`                       | Enforces the use of secure cookies                                                       |
| `gql_introspection` | Boolean  |                       `true`                        | Allows [GraphQL Introspection](https://graphql.org/learn/introspection/) against the API |
|      `origins`      | []String | `http://localhost:8080`<br/>`http://localhost:3000` | Allowed origins for [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)       |

## `database`

> Configures the connection from CBLE to the database

|   Option   |  Type   | Default | Description                                      |
| :--------: | :-----: | :-----: | :----------------------------------------------- |
| `username` | String  | `cble`  | The PostgreSQL username                          |
| `password` | String  | `cble`  | The PostgreSQL password                          |
|   `host`   | String  |  `db`   | The hostname/IP of the PostgreSQL container/host |
|   `ssl`    | Boolean | `false` | Enforces a SSL/TLS connection to PostgreSQL      |

## `providers`

> Configures the handling of providers

| Option  |  Type  |        Default        | Description                                                           |
| :-----: | :----: | :-------------------: | :-------------------------------------------------------------------- |
| `cache` | String | `/tmp/cble-providers` | The location where providers are downloaded, built, and executed from |

## `auth`

> Configures user authentication

|      Option       |   Type   |     Default      | Description                                           |
| :---------------: | :------: | :--------------: | :---------------------------------------------------- |
|     `jwt_key`     |  String  | `xxxxxxxxxxx...` | The secret key used to sign JWT authentication tokens |
| `session_timeout` | Duration |    `24h0m0s`     | Length of user session validity                       |

## `initialization`

> Options used to configure CBLE on first boot

|      Option       |  Type  |        Default        | Description                         |
| :---------------: | :----: | :-------------------: | :---------------------------------- |
| `default_project` | String |       `default`       | The name of the default project     |
|   `admin_group`   | String | `CBLE Administrators` | The name of the default admin group |

### `default_admin`

> Configuration for the default admin user (admin access granted to default project)

|    Option    |  Type  | Default | Description                     |
| :----------: | :----: | :-----: | :------------------------------ |
| `first_name` | String | `CBLE`  | First name for the default user |
| `last_name`  | String | `Admin` | Last name for the default user  |
|  `username`  | String | `cble`  | Username for the default user   |
|  `password`  | String | `cble`  | Password for the default user   |

## `deployments`

> Configures the behavior of deployments

|       Option        |   Type   |   Default   | Description                                        |
| :-----------------: | :------: | :---------: | :------------------------------------------------- |
| `auto_suspend_time` | Duration |  `3h0m0s`   | Time until deployments are automatically suspended |
|    `lease_time`     | Duration | `2160h0m0s` | Time until deployments are automatically destroyed |

## `project_defaults`

> Configures the default quotas for new projects

|     Option      | Type | Default  | Description                                            |
| :-------------: | :--: | :------: | :----------------------------------------------------- |
|   `quota_cpu`   | Int  |   `10`   | Maximum number of CPU cores (set to `-1` for infinite) |
|   `quota_ram`   | Int  | `32768`  | Maximum MiB of RAM (set to `-1` for infinite)          |
|  `quota_disk`   | Int  | `131072` | Maximum MiB of disk space (set to `-1` for infinite)   |
| `quota_network` | Int  |   `1`    | Maximum number of networks (set to `-1` for infinite)  |
| `quota_router`  | Int  |   `1`    | Maximum number of routers (set to `-1` for infinite)   |
