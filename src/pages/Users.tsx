import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Users, UserCheck, Shield, Settings } from "lucide-react";

const UsersPage = () => {
  const users = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "IT Manager",
      department: "IT Operations",
      status: "active",
      lastLogin: "2024-01-16",
      permissions: ["admin", "tickets", "assets"]
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Service Desk Agent",
      department: "IT Support",
      status: "active",
      lastLogin: "2024-01-16",
      permissions: ["tickets", "knowledge"]
    },
    {
      id: "USR-003",
      name: "Mike Davis",
      email: "mike.davis@company.com",
      role: "End User",
      department: "Marketing",
      status: "inactive",
      lastLogin: "2024-01-10",
      permissions: ["requester"]
    }
  ];

  const teams = [
    {
      id: "TEAM-001",
      name: "IT Operations",
      members: 12,
      lead: "John Smith",
      description: "Infrastructure and operations management"
    },
    {
      id: "TEAM-002", 
      name: "Service Desk",
      members: 8,
      lead: "Sarah Johnson",
      description: "First line support and incident management"
    },
    {
      id: "TEAM-003",
      name: "Security Team",
      members: 5,
      lead: "Alex Wilson",
      description: "Cybersecurity and compliance"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "suspended": return "destructive";
      default: return "secondary";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Users & Teams</h1>
            <p className="text-muted-foreground">Manage users, roles, and team structures</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/create-agents'}>
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <UserCheck className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">Supporting users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teams</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Across departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <Shield className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">With full access</p>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="requester">Requester</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT Operations</SelectItem>
                  <SelectItem value="support">IT Support</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`/api/placeholder/32/32`} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {user.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Teams Management */}
        <Card>
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <div key={team.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{team.name}</h3>
                    <Badge variant="outline">{team.members} members</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{team.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Team Lead</p>
                      <p className="text-sm font-medium">{team.lead}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role & Permission Management */}
        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Administrator</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Full System Access</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Management</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Configuration</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reports & Analytics</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Agent</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ticket Management</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Knowledge Base</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Asset Viewing</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Management</span>
                    <Badge variant="secondary">✗</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Requester</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Submit Tickets</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View Own Tickets</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Knowledge Base</span>
                    <Badge variant="default">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Asset Management</span>
                    <Badge variant="secondary">✗</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UsersPage;