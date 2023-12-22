# Blueprints

CBLE Blueprints are a custom YAML-based configuration language inspired by
[Terraform](https://developer.hashicorp.com/terraform/language/syntax/configuration) and
[Docker Compose v3](https://docs.docker.com/compose/compose-file/compose-file-v3/) syntax.

Here is what a basic blueprint looks like:

```yaml title="openstack-example.yaml"
version: "1.0" # (1)!

host1:
  resource: openstack.v1.host # (2)!
  config: # (3)!
    hostname: host1
    image: UbuntuJammy2204
    flavor: medium
    disk_size: 10
    networks:
      network1:
        dhcp: false
        ip: 10.10.0.1
  depends_on: # (4)!
    - router1

host2:
  resource: openstack.v1.host
  config:
    hostname: host2
    image: UbuntuJammy2204-Desktop
    flavor: medium
    disk_size: 25
    networks:
      network1:
        dhcp: true
  depends_on:
    - host1
    - router1

network1:
  resource: openstack.v1.network
  config:
    subnet: 10.10.0.0/24
    gateway: 10.10.0.254
    dhcp:
      - start: 10.10.0.10
        end: 10.10.0.100

router1:
  resource: openstack.v1.router
  config:
    external_network: MAIN-NAT
    networks:
      network1:
        dhcp: false
        ip: 10.10.0.254
```

1. This version refers to the version of blueprint syntax. This may change over time.
2. This is called a **resource type**. Resource types are how CBLE knows what type of resource to deploy for this object.
3. This is the **resource config**. A config is unique to the type of provider you're using.
4. `depends_on` is similar to **Docker Compose v3**. This allows us to wait on other objects to deploy _before_ we
   deploy this object (and destroy this object _before_ we destroy the parents). Providers _should_ provide inherent
   dependencies based on resource types.
