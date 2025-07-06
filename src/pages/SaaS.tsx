import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Cloud, Shield, Clock, CheckCircle } from "lucide-react";

const SaaS = () => {
  const saasApps = [
    {
      id: "SAAS-001",
      name: "Microsoft 365",
      category: "Productivity",
      status: "active",
      licenses: "150/200",
      cost: "$2,250/month",
      renewal: "2024-06-15",
      usage: "95%"
    },
    {
      id: "SAAS-002",
      name: "Salesforce CRM",
      category: "CRM",
      status: "active", 
      licenses: "45/50",
      cost: "$4,500/month",
      renewal: "2024-03-20",
      usage: "90%"
    },
    {
      id: "SAAS-003",
      name: "Slack Enterprise",
      category: "Communication",
      status: "trial",
      licenses: "25/25",
      cost: "$0/month",
      renewal: "2024-02-01",
      usage: "100%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "trial": return "secondary";
      case "expired": return "destructive";
      case "suspended": return "destructive";
      default: return "secondary";
    }
  };

  const getUsageColor = (usage: string) => {
    const percent = parseInt(usage);
    if (percent >= 90) return "destructive";
    if (percent >= 70) return "secondary";
    return "default";
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">SaaS Management</h1>
            <p className="text-muted-foreground">Manage software as a service applications and licenses</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add SaaS App
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
              <Cloud className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
              <Shield className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,670</div>
              <p className="text-xs text-muted-foreground">-$2,340 saved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">License Utilization</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">83%</div>
              <p className="text-xs text-muted-foreground">Avg across all apps</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Renewals Due</CardTitle>
              <Clock className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Cost Optimization */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Optimization Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Unused Licenses</h3>
                  <Badge variant="destructive">47</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Potential savings: $2,850/month</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Review & Optimize
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Duplicate Apps</h3>
                  <Badge variant="secondary">3</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Similar functionality detected</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Consolidate
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Contract Renewals</h3>
                  <Badge variant="secondary">7</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Negotiate better terms</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Plan Renewals
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">High Usage</h3>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">&gt;80% utilization</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-sm">Medium Usage</h3>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-muted-foreground">40-80% utilization</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-sm">Low Usage</h3>
                <p className="text-2xl font-bold">9</p>
                <p className="text-xs text-muted-foreground">&lt;40% utilization</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-sm">Discovered</h3>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Shadow IT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SaaS Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>SaaS Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search SaaS applications..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="crm">CRM</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Licenses</TableHead>
                  <TableHead>Monthly Cost</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saasApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.category}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{app.licenses}</TableCell>
                    <TableCell>{app.cost}</TableCell>
                    <TableCell>{app.renewal}</TableCell>
                    <TableCell>
                      <Badge variant={getUsageColor(app.usage)}>
                        {app.usage}
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

export default SaaS;