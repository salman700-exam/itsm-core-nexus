import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, BarChart3, Shield, CheckCircle, Clock } from "lucide-react";

const Portfolio = () => {
  const portfolioProjects = [
    {
      id: "PORTFOLIO-001",
      name: "Digital Transformation Initiative",
      type: "Strategic",
      status: "in-progress",
      priority: "high",
      budget: "$2,500,000",
      spent: "$1,650,000",
      progress: 66,
      roi: "145%",
      risk: "low",
      owner: "CTO Office"
    },
    {
      id: "PORTFOLIO-002",
      name: "Infrastructure Modernization",
      type: "Infrastructure",
      status: "planning",
      priority: "medium",
      budget: "$1,800,000",
      spent: "$350,000",
      progress: 19,
      roi: "120%",
      risk: "medium",
      owner: "IT Operations"
    },
    {
      id: "PORTFOLIO-003",
      name: "Cybersecurity Enhancement",
      type: "Security",
      status: "completed",
      priority: "critical",
      budget: "$900,000",
      spent: "$875,000",
      progress: 100,
      roi: "180%",
      risk: "low",
      owner: "Security Team"
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "default";
      case "medium": return "secondary";
      case "high": return "destructive";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Management</h1>
            <p className="text-muted-foreground">Strategic oversight of all organizational initiatives</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Initiative
          </Button>
        </div>

        {/* Executive Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <BarChart3 className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8.5M</div>
              <p className="text-xs text-muted-foreground">Across 12 initiatives</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio ROI</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">148%</div>
              <p className="text-xs text-muted-foreground">Weighted average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk Projects</CardTitle>
              <Shield className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Require intervention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
              <Clock className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">$6.1M of $8.5M</p>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Alignment */}
        <Card>
          <CardHeader>
            <CardTitle>Strategic Alignment Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Business Objectives</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Digital Transformation</span>
                    <Badge variant="default">On Track</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost Optimization</span>
                    <Badge variant="secondary">At Risk</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Enhancement</span>
                    <Badge variant="default">Completed</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Resource Allocation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Strategic Projects</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Infrastructure</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Security</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Risk Assessment</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low Risk</span>
                    <Badge variant="default">7 projects</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium Risk</span>
                    <Badge variant="secondary">3 projects</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Risk</span>
                    <Badge variant="destructive">2 projects</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Value Delivered</h3>
                <p className="text-2xl font-bold">$12.6M</p>
                <p className="text-sm text-muted-foreground">Business value</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">On-Time Delivery</h3>
                <p className="text-2xl font-bold">83%</p>
                <p className="text-sm text-muted-foreground">Projects delivered</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Budget Variance</h3>
                <p className="text-2xl font-bold">-5%</p>
                <p className="text-sm text-muted-foreground">Under budget</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Resource Efficiency</h3>
                <p className="text-2xl font-bold">91%</p>
                <p className="text-sm text-muted-foreground">Utilization rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Table */}
        <Card>
          <CardHeader>
            <CardTitle>Strategic Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search portfolio initiatives..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="strategic">Strategic</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {portfolioProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.id} • {project.owner}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                      <Badge variant={getRiskColor(project.risk)}>{project.risk} risk</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm font-medium">Budget</p>
                      <p className="text-lg">{project.budget}</p>
                      <p className="text-sm text-muted-foreground">Spent: {project.spent}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Progress</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={project.progress} className="w-20 h-2" />
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expected ROI</p>
                      <p className="text-lg font-semibold text-primary">{project.roi}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm">{project.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Priority</p>
                      <Badge variant={project.priority === 'critical' ? 'destructive' : 'secondary'}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Portfolio;