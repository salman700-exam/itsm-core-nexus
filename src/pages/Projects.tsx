import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Calendar, Clock, CheckCircle, Users } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: "PRJ-001",
      name: "ERP System Upgrade",
      status: "in-progress",
      priority: "high",
      manager: "Alice Johnson",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      progress: 65,
      budget: "$150,000",
      team: 8
    },
    {
      id: "PRJ-002",
      name: "Cloud Migration Phase 2",
      status: "planning",
      priority: "medium",
      manager: "Bob Smith",
      startDate: "2024-02-01",
      endDate: "2024-08-15",
      progress: 15,
      budget: "$200,000",
      team: 12
    },
    {
      id: "PRJ-003",
      name: "Security Compliance Audit",
      status: "completed",
      priority: "high",
      manager: "Carol Davis",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      progress: 100,
      budget: "$75,000",
      team: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "secondary";
      case "in-progress": return "default";
      case "completed": return "default";
      case "on-hold": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "secondary";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-primary";
    if (progress >= 50) return "bg-secondary";
    return "bg-muted";
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground">Plan, execute, and track project deliverables</p>
          </div>
          <Button onClick={() => window.location.href = '/create-project'}>
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Calendar className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-muted-foreground">75% on track</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <Clock className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline & Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="font-semibold">ERP System Go-Live</h3>
                    <p className="text-sm text-muted-foreground">June 30, 2024</p>
                  </div>
                </div>
                <Badge variant="secondary">65% Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  <div>
                    <h3 className="font-semibold">Cloud Migration Phase 2</h3>
                    <p className="text-sm text-muted-foreground">August 15, 2024</p>
                  </div>
                </div>
                <Badge variant="secondary">15% Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="font-semibold">Network Upgrade</h3>
                    <p className="text-sm text-muted-foreground">September 30, 2024</p>
                  </div>
                </div>
                <Badge variant="secondary">Planning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Team Utilization</h3>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">Avg across teams</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Budget Utilization</h3>
                <p className="text-2xl font-bold">$1.2M</p>
                <p className="text-sm text-muted-foreground">of $1.8M allocated</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Avg Completion</h3>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-sm text-muted-foreground">Across active projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Project Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Team Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.manager}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={project.progress} className="w-16 h-2" />
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{project.endDate}</TableCell>
                    <TableCell>{project.budget}</TableCell>
                    <TableCell>{project.team}</TableCell>
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

export default Projects;