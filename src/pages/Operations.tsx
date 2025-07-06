import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, AlertTriangle, Clock, CheckCircle, Shield } from "lucide-react";

const Operations = () => {
  const incidents = [
    {
      id: "INC-001",
      title: "Email Server Down",
      status: "open",
      priority: "high",
      assignee: "Server Team",
      created: "2024-01-16 09:30",
      sla: "2h remaining"
    },
    {
      id: "INC-002", 
      title: "Printer Not Working - Floor 3",
      status: "in-progress",
      priority: "medium",
      assignee: "Field Support",
      created: "2024-01-16 08:15",
      sla: "4h remaining"
    },
    {
      id: "INC-003",
      title: "VPN Connection Issues",
      status: "resolved",
      priority: "low",
      assignee: "Network Team",
      created: "2024-01-15 14:20",
      sla: "Resolved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "destructive";
      case "in-progress": return "secondary";
      case "resolved": return "default";
      case "closed": return "default";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">IT Operations</h1>
            <p className="text-muted-foreground">Monitor and manage IT service incidents</p>
          </div>
          <Button onClick={() => window.location.href = '/create-ticket'}>
            <Plus className="w-4 h-4 mr-2" />
            Create Incident
          </Button>
        </div>

        {/* Real-time Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 critical</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Avg: 2.5h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
              <Shield className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Health Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Health Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Email Services</h3>
                  <Badge variant="destructive">Down</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Last incident: 30 min ago</p>
                <p className="text-sm text-muted-foreground">Affected users: 150</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Network Infrastructure</h3>
                  <Badge variant="default">Operational</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Uptime: 99.9%</p>
                <p className="text-sm text-muted-foreground">Last check: 5 min ago</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Database Services</h3>
                  <Badge variant="secondary">Degraded</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Response time: +200ms</p>
                <p className="text-sm text-muted-foreground">Under investigation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident Management */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search incidents..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Escalate
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>SLA Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.id}</TableCell>
                    <TableCell>{incident.title}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(incident.priority)}>
                        {incident.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{incident.assignee}</TableCell>
                    <TableCell>{incident.created}</TableCell>
                    <TableCell>{incident.sla}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <AlertTriangle className="w-6 h-6 mb-2" />
                <span className="text-sm">Declare Major Incident</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Clock className="w-6 h-6 mb-2" />
                <span className="text-sm">Schedule Maintenance</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Service Recovery</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Shield className="w-6 h-6 mb-2" />
                <span className="text-sm">Emergency Response</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Operations;