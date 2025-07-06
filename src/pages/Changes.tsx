import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const Changes = () => {
  const changes = [
    {
      id: "CHG-001",
      title: "Server Maintenance - Database Upgrade",
      status: "scheduled",
      priority: "high",
      type: "normal",
      implementer: "Database Team",
      scheduledDate: "2024-01-20",
      risk: "medium"
    },
    {
      id: "CHG-002",
      title: "Network Switch Replacement",
      status: "approved",
      priority: "medium", 
      type: "standard",
      implementer: "Network Team",
      scheduledDate: "2024-01-18",
      risk: "low"
    },
    {
      id: "CHG-003",
      title: "Emergency Security Patch",
      status: "implemented",
      priority: "urgent",
      type: "emergency",
      implementer: "Security Team",
      scheduledDate: "2024-01-15",
      risk: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "secondary";
      case "approved": return "default";
      case "implemented": return "default";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
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
            <h1 className="text-3xl font-bold">Change Management</h1>
            <p className="text-muted-foreground">Control and track system changes</p>
          </div>
          <Button onClick={() => window.location.href = '/create-change'}>
            <Plus className="w-4 h-4 mr-2" />
            Create Change
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Awaiting CAB review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Implemented</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Change Advisory Board */}
        <Card>
          <CardHeader>
            <CardTitle>Change Advisory Board (CAB)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Next Meeting</h3>
                <p className="text-sm text-muted-foreground">January 18, 2024</p>
                <p className="text-sm text-muted-foreground">2:00 PM</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <h3 className="font-semibold">Pending Review</h3>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Changes</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Emergency Changes</h3>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">This week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search changes..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="implemented">Implemented</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Change ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Implementer</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changes.map((change) => (
                  <TableRow key={change.id}>
                    <TableCell className="font-medium">{change.id}</TableCell>
                    <TableCell>{change.title}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(change.status)}>
                        {change.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{change.priority}</Badge>
                    </TableCell>
                    <TableCell>{change.type}</TableCell>
                    <TableCell>{change.implementer}</TableCell>
                    <TableCell>{change.scheduledDate}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(change.risk)}>
                        {change.risk}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Changes;