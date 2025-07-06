import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Database, 
  Zap, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus,
  Timer,
  Bug,
  TrendingUp,
  MemoryStick
} from "lucide-react";

const ApplicationCard = ({ 
  name, 
  platform, 
  status, 
  responseTime, 
  throughput, 
  errorRate, 
  apdex 
}: {
  name: string;
  platform: string;
  status: "healthy" | "warning" | "critical";
  responseTime: string;
  throughput: string;
  errorRate: number;
  apdex: number;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "healthy":
        return "success";
      case "warning":
        return "warning";
      case "critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getApdexColor = () => {
    if (apdex >= 0.94) return "text-success";
    if (apdex >= 0.7) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{platform}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge variant={getStatusVariant() as any} className="text-xs">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Timer className="w-3 h-3" />
              Response Time
            </div>
            <div className="font-semibold">{responseTime}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Throughput
            </div>
            <div className="font-semibold">{throughput}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Error Rate</span>
            <span className="font-medium">{errorRate}%</span>
          </div>
          <Progress 
            value={errorRate} 
            className={`h-2 ${errorRate > 5 ? "bg-destructive" : errorRate > 2 ? "bg-warning" : "bg-success"}`} 
          />
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Apdex Score</span>
            <span className={`font-semibold ${getApdexColor()}`}>{apdex.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionTrace = ({ 
  name, 
  duration, 
  status, 
  timestamp, 
  database, 
  external 
}: {
  name: string;
  duration: string;
  status: "fast" | "slow" | "error";
  timestamp: string;
  database: string;
  external: string;
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "fast":
        return "text-success";
      case "slow":
        return "text-warning";
      case "error":
        return "text-destructive";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{name}</span>
          <Badge variant="outline" className="text-xs">{timestamp}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>DB: {database}</span>
          <span>External: {external}</span>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-semibold ${getStatusColor()}`}>{duration}</div>
        <div className="text-xs text-muted-foreground">{status}</div>
      </div>
    </div>
  );
};

export function ApplicationMonitoring() {
  const applications = [
    {
      name: "E-commerce API",
      platform: "Node.js",
      status: "healthy" as const,
      responseTime: "125ms",
      throughput: "1,245 rpm",
      errorRate: 0.8,
      apdex: 0.96
    },
    {
      name: "User Service",
      platform: "Java Spring",
      status: "warning" as const,
      responseTime: "340ms",
      throughput: "892 rpm",
      errorRate: 3.2,
      apdex: 0.78
    },
    {
      name: "Analytics Engine",
      platform: "Python Django",
      status: "healthy" as const,
      responseTime: "89ms",
      throughput: "2,156 rpm",
      errorRate: 0.4,
      apdex: 0.98
    },
    {
      name: "Payment Gateway",
      platform: ".NET Core",
      status: "critical" as const,
      responseTime: "2.1s",
      throughput: "234 rpm",
      errorRate: 8.7,
      apdex: 0.45
    }
  ];

  const traces = [
    {
      name: "/api/v1/orders",
      duration: "156ms",
      status: "fast" as const,
      timestamp: "2 min ago",
      database: "45ms",
      external: "23ms"
    },
    {
      name: "/api/v1/users/profile",
      duration: "890ms",
      status: "slow" as const,
      timestamp: "5 min ago",
      database: "567ms",
      external: "123ms"
    },
    {
      name: "/api/v1/payments/process",
      duration: "2.3s",
      status: "error" as const,
      timestamp: "8 min ago",
      database: "1.2s",
      external: "800ms"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Application Performance Monitoring</h2>
          <p className="text-muted-foreground">
            Code-level tracing for Java, .NET, Python, Node.js, PHP, and Ruby applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Service Map
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              APM Features
            </CardTitle>
            <CardDescription>
              Deep application insights and performance monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Code-level tracing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Component tracing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Distributed tracing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>CPU and memory monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>SQL Query monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Service maps</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5" />
              Advanced Diagnostics
            </CardTitle>
            <CardDescription>
              Advanced debugging and analysis tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Deployment tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Code performance comparisons</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Transaction flow mapping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Thread profiler & dump analyzer</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>JVM memory leak detection</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">30 traces/min</Badge>
                <span className="text-xs">Sampling rate</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {applications.map((app, index) => (
          <ApplicationCard key={index} {...app} />
        ))}
      </div>

      {/* Transaction Traces */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Transaction Traces
          </CardTitle>
          <CardDescription>
            Detailed transaction performance breakdown
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {traces.map((trace, index) => (
            <TransactionTrace key={index} {...trace} />
          ))}
          <Button variant="outline" className="w-full mt-4">
            View All Traces
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}