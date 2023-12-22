# Concepts

There are a few key concepts to understand when working with CBLE blueprints:

## Resources

A resource represents _something_ which would be deployed in the cloud. This might be a server, a database, a load balancer,
a router, anything you can deploy in the cloud (which CBLE supports; see [Providers](#)).

Let's use this resource as an example:

```yaml title="Example resource"
host1:
  resource: openstack.v1.host
  config:
    hostname: host1
    image: UbuntuJammy2204
    flavor: medium
    disk_size: 10
    networks:
      network1:
        dhcp: false
        ip: 10.10.0.1
  depends_on:
    - router1
```

There is a lot to unpack here, but let's unpack line-by-line:

1. `host1:` - This represents a unique key which can be used to reference this resource elsewhere in the blueprint
2. `resource: openstack.v1.host` - Defines the type of resources this reference represents (in this case a host on OpenStack)
3. `config:` - This entire block is going to be unique to each provider used. Values here are used by the provider to
   deploy/configure the intended resource
4. `depends_on` - This is a list of other resource references (like line 1) on which this resource depends. This resource
   will not be deployed until all `depends_on` resources are successful. This resource will be destroyed before any `depends_on`
   resources are destroyed

For more information on the resource configs, please refer to the [provider documentation](#).
