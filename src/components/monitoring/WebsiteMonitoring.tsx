import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Shield, 
  Clock, 
  Users,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus,
  Activity,
  MapPin,
  Eye,
  Smartphone,
  Monitor,
  Chrome,
  Zap
} from "lucide-react";

const UptimeMonitor = ({ 
  url, 
  status, 
  uptime, 
  responseTime, 
  location,
  lastCheck
}: {
  url: string;
  status: "up" | "down" | "warning";
  uptime: string;
  responseTime: string;
  location: string;
  lastCheck: string;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "up":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "down":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "up":
        return "success";
      case "down":
        return "destructive";
      case "warning":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{url}</span>
            <Badge variant="outline" className="text-xs">{location}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Last check: {lastCheck}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{responseTime}</div>
        <Badge variant={getStatusVariant() as any} className="text-xs">
          {uptime} uptime
        </Badge>
      </div>
    </div>
  );
};

const SyntheticTransaction = ({ 
  name, 
  steps, 
  status, 
  duration, 
  lastRun,
  browser
}: {
  name: string;
  steps: number;
  status: "success" | "failed" | "partial";
  duration: string;
  lastRun: string;
  browser: string;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "partial":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            <Badge variant="outline" className="text-xs">{steps} steps</Badge>
            <Badge variant="outline" className="text-xs">{browser}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Last run: {lastRun}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold">{duration}</div>
        <div className="text-xs text-muted-foreground capitalize">{status}</div>
      </div>
    </div>
  );
};

const RUMMetric = ({ 
  metric, 
  value, 
  trend, 
  icon: Icon 
}: {
  metric: string;
  value: string;
  trend: "up" | "down" | "stable";
  icon: any;
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-destructive";
      case "down":
        return "text-success";
      case "stable":
        return "text-muted-foreground";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{metric}</span>
      </div>
      <div className="text-right">
        <div className="font-semibold">{value}</div>
        <div className={`text-xs ${getTrendColor()}`}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trend}
        </div>
      </div>
    </div>
  );
};

export function WebsiteMonitoring() {
  const uptimeMonitors = [
    {
      url: "https://app.company.com",
      status: "up" as const,
      uptime: "99.98%",
      responseTime: "234ms",
      location: "US-East",
      lastCheck: "30s ago"
    },
    {
      url: "https://api.company.com/v1",
      status: "up" as const,
      uptime: "99.95%",
      responseTime: "145ms",
      location: "EU-West",
      lastCheck: "45s ago"
    },
    {
      url: "https://checkout.company.com",
      status: "warning" as const,
      uptime: "98.80%",
      responseTime: "1.2s",
      location: "Asia-Pacific",
      lastCheck: "1m ago"
    },
    {
      url: "https://cdn.company.com",
      status: "down" as const,
      uptime: "95.20%",
      responseTime: "Timeout",
      location: "Global",
      lastCheck: "5m ago"
    }
  ];

  const syntheticTransactions = [
    {
      name: "User Login Flow",
      steps: 5,
      status: "success" as const,
      duration: "2.3s",
      lastRun: "2m ago",
      browser: "Chrome"
    },
    {
      name: "Checkout Process",
      steps: 8,
      status: "partial" as const,
      duration: "4.1s",
      lastRun: "5m ago",
      browser: "Firefox"
    },
    {
      name: "Search & Filter",
      steps: 3,
      status: "success" as const,
      duration: "1.8s",
      lastRun: "1m ago",
      browser: "Safari"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Website & Digital Experience Monitoring</h2>
          <p className="text-muted-foreground">
            Uptime monitoring from 130+ global locations, synthetic transactions, and real user monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Locations
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Monitor
          </Button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Global Uptime</CardTitle>
            <Globe className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.94%</div>
            <p className="text-xs text-muted-foreground">130+ locations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345ms</div>
            <p className="text-xs text-muted-foreground">Global average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">SSL Certificates</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">All valid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Real Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Active sessions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Uptime Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Uptime Monitoring
            </CardTitle>
            <CardDescription>
              HTTP/HTTPS availability checks from global locations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {uptimeMonitors.map((monitor, index) => (
              <UptimeMonitor key={index} {...monitor} />
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Monitors
            </Button>
          </CardContent>
        </Card>

        {/* Synthetic Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Chrome className="w-5 h-5" />
              Synthetic Transactions
            </CardTitle>
            <CardDescription>
              Multi-step browser transactions using real browsers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {syntheticTransactions.map((transaction, index) => (
              <SyntheticTransaction key={index} {...transaction} />
            ))}
            <Button variant="outline" className="w-full mt-4">
              Record New Transaction
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Real User Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real User Monitoring (RUM)
          </CardTitle>
          <CardDescription>
            Session replays, JS errors, and geographic/browser/device breakdowns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <RUMMetric
              metric="Page Load Time"
              value="2.4s"
              trend="down"
              icon={Clock}
            />
            <RUMMetric
              metric="JS Errors"
              value="23"
              trend="up"
              icon={AlertTriangle}
            />
            <RUMMetric
              metric="Mobile Users"
              value="68%"
              trend="stable"
              icon={Smartphone}
            />
            <RUMMetric
              metric="Desktop Users"
              value="32%"
              trend="stable"
              icon={Monitor}
            />
          </div>
          
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">Top Browsers</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chrome</span>
                  <span>64%</span>
                </div>
                <Progress value={64} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Safari</span>
                  <span>23%</span>
                </div>
                <Progress value={23} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Firefox</span>
                  <span>13%</span>
                </div>
                <Progress value={13} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Geographic Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>North America</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Europe</span>
                  <span>32%</span>
                </div>
                <Progress value={32} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Asia Pacific</span>
                  <span>23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Device Types</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mobile</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Desktop</span>
                  <span>28%</span>
                </div>
                <Progress value={28} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Tablet</span>
                  <span>4%</span>
                </div>
                <Progress value={4} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Monitoring */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Monitoring
            </CardTitle>
            <CardDescription>
              SSL/TLS, domain expiry, defacement, and blocklist checks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm">SSL Certificate Valid</span>
              </div>
              <Badge variant="success">90 days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm">Domain Registration</span>
              </div>
              <Badge variant="success">365 days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm">Defacement Check</span>
              </div>
              <Badge variant="success">Clean</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm">Blocklist Status</span>
              </div>
              <Badge variant="warning">1 list</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              API Monitoring
            </CardTitle>
            <CardDescription>
              REST/SOAP/gRPC with chained transaction monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Authentication API</div>
                <div className="text-sm text-muted-foreground">POST /auth/login</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">145ms</div>
                <Badge variant="success" className="text-xs">200 OK</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">User Data API</div>
                <div className="text-sm text-muted-foreground">GET /user/profile</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">89ms</div>
                <Badge variant="success" className="text-xs">200 OK</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Payment API</div>
                <div className="text-sm text-muted-foreground">POST /payment/process</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">2.1s</div>
                <Badge variant="destructive" className="text-xs">500 Error</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}