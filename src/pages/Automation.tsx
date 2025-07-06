import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Zap, Clock, CheckCircle, Settings, Play, Pause } from "lucide-react";

const Automation = () => {
  const automationRules = [
    {
      id: "AUTO-001",
      name: "Auto-assign Hardware Issues",
      trigger: "Ticket Created",
      condition: "Category = Hardware",
      action: "Assign to Hardware Team",
      status: "active",
      executions: 234,
      successRate: "98%"
    },
    {
      id: "AUTO-002",
      name: "Escalate Critical Incidents",
      trigger: "SLA Breach Warning",
      condition: "Priority = Critical",
      action: "Notify Manager & Escalate",
      status: "active",
      executions: 45,
      successRate: "100%"
    },
    {
      id: "AUTO-003",
      name: "Close Resolved Tickets",
      trigger: "Status = Resolved",
      condition: "No response for 48h",
      action: "Auto-close ticket",
      status: "paused",
      executions: 156,
      successRate: "95%"
    }
  ];

  const workflows = [
    {
      id: "WF-001",
      name: "Employee Onboarding",
      type: "Service Request",
      steps: 12,
      avgDuration: "2.5 days",
      status: "active",
      completions: 23
    },
    {
      id: "WF-002",
      name: "Password Reset Process",
      type: "Incident",
      steps: 5,
      avgDuration: "15 min",
      status: "active",
      completions: 445
    },
    {
      id: "WF-003",
      name: "Hardware Procurement",
      type: "Change",
      steps: 8,
      avgDuration: "5 days",
      status: "draft",
      completions: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "paused": return "secondary";
      case "draft": return "secondary";
      case "error": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Automation & Productivity</h1>
            <p className="text-muted-foreground">Streamline processes with intelligent automation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Workflow Builder
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Automation
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
              <Zap className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">340h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">97.8%</div>
              <p className="text-xs text-muted-foreground">Across all automations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <Zap className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28K</div>
              <p className="text-xs text-muted-foreground">Monthly value</p>
            </CardContent>
          </Card>
        </div>

        {/* Automation Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Automation Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Ticket Routing</h3>
                <p className="text-2xl font-bold">15</p>
                <p className="text-xs text-muted-foreground">Active rules</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Status Updates</h3>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Active rules</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">SLA Management</h3>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Active rules</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <Settings className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Active rules</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Business Rules & Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search automation rules..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Triggers</SelectItem>
                  <SelectItem value="ticket-created">Ticket Created</SelectItem>
                  <SelectItem value="status-change">Status Change</SelectItem>
                  <SelectItem value="sla-breach">SLA Breach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Executions</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {automationRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.id}</TableCell>
                    <TableCell>{rule.name}</TableCell>
                    <TableCell>{rule.trigger}</TableCell>
                    <TableCell>{rule.condition}</TableCell>
                    <TableCell>{rule.action}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(rule.status)}>
                        {rule.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{rule.executions}</TableCell>
                    <TableCell>{rule.successRate}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          {rule.status === "active" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Workflow Automation */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <p className="text-sm text-muted-foreground">{workflow.id} • {workflow.type}</p>
                    </div>
                    <Badge variant={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Steps</p>
                      <p className="font-semibold">{workflow.steps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Duration</p>
                      <p className="font-semibold">{workflow.avgDuration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completions</p>
                      <p className="font-semibold">{workflow.completions}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                <Zap className="w-6 h-6 mb-2" />
                <span className="text-sm">Rule Builder</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Settings className="w-6 h-6 mb-2" />
                <span className="text-sm">Workflow Designer</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-sm">Test Automation</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Clock className="w-6 h-6 mb-2" />
                <span className="text-sm">Schedule Tasks</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Automation;