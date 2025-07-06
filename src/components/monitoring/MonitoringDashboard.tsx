import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Activity, 
  Network, 
  Cloud, 
  Database, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Wifi
} from "lucide-react";
import { InfrastructureMonitoring } from "./InfrastructureMonitoring";
import { NetworkMonitoring } from "./NetworkMonitoring";
import { ApplicationMonitoring } from "./ApplicationMonitoring";
import { CloudMonitoring } from "./CloudMonitoring";
import { LogMonitoring } from "./LogMonitoring";
import { SyntheticMonitoring } from "./SyntheticMonitoring";

const MetricCard = ({ 
  title, 
  value, 
  status, 
  icon: Icon, 
  description 
}: {
  title: string;
  value: string | number;
  status: "operational" | "warning" | "critical";
  icon: any;
  description: string;
}) => {
  const getStatusVariant = () => {
    switch (status) {
      case "operational":
        return "success";
      case "warning":
        return "warning";
      case "critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "operational":
        return "text-success";
      case "warning":
        return "text-warning";
      case "critical":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${getStatusColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          <Badge variant={getStatusVariant() as any} className="text-xs">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const ResourceStatus = ({ 
  name, 
  type, 
  status, 
  uptime, 
  location 
}: {
  name: string;
  type: string;
  status: "up" | "down" | "warning";
  uptime: string;
  location: string;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "up":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "down":
        return <XCircle className="w-4 h-4 text-destructive" />;
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
            <span className="font-medium">{name}</span>
            <Badge variant="outline" className="text-xs">{type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <div className="text-right">
        <Badge variant={getStatusVariant() as any}>
          {status.toUpperCase()}
        </Badge>
        <p className="text-xs text-muted-foreground mt-1">{uptime} uptime</p>
      </div>
    </div>
  );
};

export function MonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const resources = [
    {
      name: "Web Server 01",
      type: "Server",
      status: "up" as const,
      uptime: "99.99%",
      location: "US-East-1"
    },
    {
      name: "Database Primary",
      type: "Database",
      status: "up" as const,
      uptime: "99.95%",
      location: "US-West-2"
    },
    {
      name: "Load Balancer",
      type: "Network",
      status: "warning" as const,
      uptime: "98.80%",
      location: "EU-West-1"
    },
    {
      name: "API Gateway",
      type: "Service",
      status: "down" as const,
      uptime: "95.20%",
      location: "Asia-Pacific"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Infrastructure Monitoring</h1>
          <p className="text-muted-foreground">
            Comprehensive monitoring and observability for your IT infrastructure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Live View
          </Button>
          <Button size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Add Monitor
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Monitors"
          value={247}
          status="operational"
          icon={Monitor}
          description="Active monitoring checks"
        />
        <MetricCard
          title="Uptime Average"
          value="99.97%"
          status="operational"
          icon={TrendingUp}
          description="Last 30 days"
        />
        <MetricCard
          title="Active Alerts"
          value={3}
          status="warning"
          icon={AlertTriangle}
          description="Requires attention"
        />
        <MetricCard
          title="Data Retention"
          value="3 Years"
          status="operational"
          icon={Database}
          description="Historical data stored"
        />
      </div>

      {/* Monitoring Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="application">APM</TabsTrigger>
          <TabsTrigger value="cloud">Cloud</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="synthetic">Synthetic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Resource Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Resource Status
                </CardTitle>
                <CardDescription>
                  Current status of monitored resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, index) => (
                  <ResourceStatus key={index} {...resource} />
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Resources
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Real-time performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">CPU Usage</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">45%</span>
                    <Badge variant="success" className="ml-2 text-xs">Normal</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Memory Usage</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">72%</span>
                    <Badge variant="warning" className="ml-2 text-xs">High</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Network I/O</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">1.2 GB/s</span>
                    <Badge variant="success" className="ml-2 text-xs">Normal</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Response Time</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">245ms</span>
                    <Badge variant="success" className="ml-2 text-xs">Fast</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Detailed Metrics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Platform Features */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
              <CardDescription>
                Enterprise-grade monitoring features enabled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>SAML SSO</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Biometric Auth</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Multi-User Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>3-Year Data Retention</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>500 Monitor Groups</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Custom Dashboards</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>AI Anomaly Detection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>IT Automation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure">
          <InfrastructureMonitoring />
        </TabsContent>

        <TabsContent value="network">
          <NetworkMonitoring />
        </TabsContent>

        <TabsContent value="application">
          <ApplicationMonitoring />
        </TabsContent>

        <TabsContent value="cloud">
          <CloudMonitoring />
        </TabsContent>

        <TabsContent value="logs">
          <LogMonitoring />
        </TabsContent>

        <TabsContent value="synthetic">
          <SyntheticMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
}