import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Clock, CheckCircle, AlertTriangle, TrendingUp, Users, Package, Shield } from "lucide-react";

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
            <p className="text-muted-foreground">Data-driven insights for IT service management</p>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Report</Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Availability</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.8%</div>
              <p className="text-xs text-muted-foreground">+0.2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MTTR</CardTitle>
              <Clock className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-muted-foreground">-0.6h improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">First Call Resolution</CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6/5</div>
              <p className="text-xs text-muted-foreground">892 responses</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Desk Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Volume Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>This Month</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">1,247</span>
                    <Badge variant="default">+12%</Badge>
                  </div>
                </div>
                <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart visualization placeholder</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">New</p>
                    <p className="font-semibold">342</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="font-semibold">156</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="font-semibold">749</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Overall Compliance</span>
                  <Badge variant="default">94.2%</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Critical (4h SLA)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-18 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High (8h SLA)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-19 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium (24h SLA)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-full h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">97%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low (72h SLA)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-full h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  IT Operations
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Tickets Resolved</span>
                    <span className="font-medium">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Resolution Time</span>
                    <span className="font-medium">3.2h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">SLA Compliance</span>
                    <Badge variant="default">96%</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Team
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Tickets Resolved</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Resolution Time</span>
                    <span className="font-medium">1.8h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">SLA Compliance</span>
                    <Badge variant="default">98%</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Asset Management
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Tickets Resolved</span>
                    <span className="font-medium">123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Resolution Time</span>
                    <span className="font-medium">2.5h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">SLA Compliance</span>
                    <Badge variant="secondary">89%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Cost & Resource Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Cost per Ticket</h3>
                <p className="text-2xl font-bold">$47</p>
                <p className="text-xs text-muted-foreground">-$8 vs last month</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Agent Utilization</h3>
                <p className="text-2xl font-bold">84%</p>
                <p className="text-xs text-muted-foreground">Across all agents</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Automation Rate</h3>
                <p className="text-2xl font-bold">34%</p>
                <p className="text-xs text-muted-foreground">+12% this quarter</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Cost Savings</h3>
                <p className="text-2xl font-bold">$125K</p>
                <p className="text-xs text-muted-foreground">YTD through automation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Predictive Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Trend Predictions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm">Ticket Volume</span>
                    </div>
                    <Badge variant="secondary">+15% next month</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Hardware Failures</span>
                    </div>
                    <Badge variant="destructive">Peak in 2 weeks</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm">Resource Demand</span>
                    </div>
                    <Badge variant="secondary">Stable</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Recommendations</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Scale Support Team</p>
                    <p className="text-xs text-muted-foreground">
                      Consider adding 2 agents to handle predicted volume increase
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Proactive Maintenance</p>
                    <p className="text-xs text-muted-foreground">
                      Schedule preventive maintenance for aging hardware
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Knowledge Base Update</p>
                    <p className="text-xs text-muted-foreground">
                      Add articles for top 5 recurring issues
                    </p>
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

export default Analytics;