# Permissions

Projects can be shared with **Users** and **Groups** through memberships. Each membership is assigned a **Role**. These
roles are used to give permissions to the members of a project. Roles act as a tiered permission system, each higher role
inheriting the permissions of the roles below it.

There are four distinct roles a project member can have:

|    Role     | Permissions                                                                                                             |
| :---------: | :---------------------------------------------------------------------------------------------------------------------- |
|   `Admin`   | <ul><li>Manage project information (name, quotas, etc.)</li><li>All `Developer` permissions</li></ul>                   |
| `Developer` | <ul><li>Develop blueprints in a project and share them</li><li>All `Deployer` permissions</li></ul>                     |
| `Deployer`  | <ul><li>Deploy blueprints into a project</li><li>Redeploy/Delete deployments</li><li>All `Viewer` permissions</li></ul> |
|  `Viewer`   | <ul><li>View deployments in a project and interact with them</li></ul>                                                  |
