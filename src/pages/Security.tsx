import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Shield, AlertTriangle, Lock, CheckCircle, Key, Settings } from "lucide-react";

const Security = () => {
  const securityEvents = [
    {
      id: "SEC-001",
      type: "Login Failure",
      severity: "medium",
      user: "john.doe@company.com",
      timestamp: "2024-01-16 14:32",
      status: "resolved",
      details: "Multiple failed login attempts from IP 192.168.1.100"
    },
    {
      id: "SEC-002",
      type: "Privilege Escalation",
      severity: "high",
      user: "admin@company.com",
      timestamp: "2024-01-16 13:15",
      status: "investigating",
      details: "User granted admin privileges outside normal hours"
    },
    {
      id: "SEC-003",
      type: "Data Access",
      severity: "low",
      user: "sarah.j@company.com", 
      timestamp: "2024-01-16 12:45",
      status: "cleared",
      details: "Access to sensitive customer data logged"
    }
  ];

  const complianceChecks = [
    {
      framework: "SOC 2",
      status: "compliant",
      lastAudit: "2023-12-15",
      nextReview: "2024-06-15",
      coverage: "98%"
    },
    {
      framework: "ISO 27001",
      status: "compliant",
      lastAudit: "2023-11-20",
      nextReview: "2024-05-20",
      coverage: "95%"
    },
    {
      framework: "GDPR",
      status: "partial",
      lastAudit: "2024-01-10",
      nextReview: "2024-04-10",
      coverage: "87%"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "default";
      case "cleared": return "default";
      case "investigating": return "secondary";
      case "pending": return "destructive";
      default: return "secondary";
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant": return "default";
      case "partial": return "secondary";
      case "non-compliant": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Security & Compliance</h1>
            <p className="text-muted-foreground">Monitor security events and ensure compliance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Security Settings
            </Button>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Run Security Scan
            </Button>
          </div>
        </div>

        {/* Security Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Events</CardTitle>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <Shield className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">93%</div>
              <p className="text-xs text-muted-foreground">Across all frameworks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Password Health</CardTitle>
              <Key className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Strong passwords</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Policies */}
        <Card>
          <CardHeader>
            <CardTitle>Security Policies & Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Access Controls
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Multi-Factor Auth</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Password Policy</span>
                    <Badge variant="default">Strong</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Timeout</span>
                    <Badge variant="default">30 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">IP Restrictions</span>
                    <Badge variant="secondary">Configured</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Data Protection
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Encryption at Rest</span>
                    <Badge variant="default">AES-256</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Encryption in Transit</span>
                    <Badge variant="default">TLS 1.3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Backup</span>
                    <Badge variant="default">Daily</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Retention</span>
                    <Badge variant="secondary">7 years</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Monitoring
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Real-time Alerts</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audit Logging</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vulnerability Scans</span>
                    <Badge variant="default">Weekly</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Threat Detection</span>
                    <Badge variant="default">AI-Powered</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Framework Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceChecks.map((framework, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{framework.framework}</h3>
                      <p className="text-sm text-muted-foreground">Coverage: {framework.coverage}</p>
                    </div>
                    <Badge variant={getComplianceColor(framework.status)}>
                      {framework.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Audit</p>
                      <p className="font-medium">{framework.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Review</p>
                      <p className="font-medium">{framework.nextReview}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search security events..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="cleared">Cleared</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.id}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{event.user}</TableCell>
                    <TableCell>{event.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {event.details}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Investigate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Security Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Security Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Incidents Prevented</h3>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Lock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Failed Logins</h3>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Patches Applied</h3>
                <p className="text-2xl font-bold">234</p>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <h3 className="font-semibold">Vulnerabilities</h3>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Open, 3 critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Security;