import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Clock, 
  Eye, 
  Play,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Settings,
  Plus,
  MapPin,
  Activity,
  Users,
  Video
} from "lucide-react";

const SyntheticTest = ({ 
  name, 
  type, 
  url, 
  status, 
  responseTime, 
  uptime, 
  locations, 
  frequency 
}: {
  name: string;
  type: "website" | "api" | "transaction";
  url: string;
  status: "up" | "down" | "warning";
  responseTime: string;
  uptime: string;
  locations: number;
  frequency: string;
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

  const getTypeIcon = () => {
    switch (type) {
      case "website":
        return <Globe className="w-4 h-4 text-muted-foreground" />;
      case "api":
        return <Activity className="w-4 h-4 text-muted-foreground" />;
      case "transaction":
        return <Play className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="truncate max-w-xs">{url}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge variant={getStatusVariant() as any} className="text-xs">
              {status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Response Time
            </div>
            <div className="font-semibold">{responseTime}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Uptime</div>
            <div className="font-semibold">{uptime}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Locations
            </div>
            <div className="font-semibold">{locations}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Frequency</div>
            <div className="font-semibold">{frequency}</div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RealUserMetric = ({ 
  name, 
  value, 
  change, 
  status 
}: {
  name: string;
  value: string;
  change: string;
  status: "good" | "warning" | "poor";
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-success";
      case "warning":
        return "text-warning";
      case "poor":
        return "text-destructive";
    }
  };

  const getChangeColor = () => {
    const isNegative = change.startsWith('-');
    // For response times, negative is good. For errors, positive is bad
    if (name.includes('Time') || name.includes('Duration')) {
      return isNegative ? 'text-success' : 'text-destructive';
    }
    return isNegative ? 'text-destructive' : 'text-success';
  };

  return (
    <div className="text-center p-4 border border-border rounded-lg">
      <div className={`text-2xl font-bold ${getStatusColor()}`}>{value}</div>
      <div className="text-sm text-muted-foreground mb-1">{name}</div>
      <div className={`text-xs ${getChangeColor()}`}>{change}</div>
    </div>
  );
};

export function SyntheticMonitoring() {
  const syntheticTests = [
    {
      name: "Homepage Monitoring",
      type: "website" as const,
      url: "https://example.com",
      status: "up" as const,
      responseTime: "245ms",
      uptime: "99.97%",
      locations: 8,
      frequency: "1 min"
    },
    {
      name: "API Health Check",
      type: "api" as const,
      url: "https://api.example.com/health",
      status: "up" as const,
      responseTime: "120ms",
      uptime: "99.99%",
      locations: 5,
      frequency: "1 min"
    },
    {
      name: "User Registration Flow",
      type: "transaction" as const,
      url: "https://app.example.com/register",
      status: "warning" as const,
      responseTime: "1.2s",
      uptime: "98.5%",
      locations: 8,
      frequency: "5 min"
    },
    {
      name: "Payment Gateway",
      type: "transaction" as const,
      url: "https://checkout.example.com",
      status: "down" as const,
      responseTime: "N/A",
      uptime: "95.2%",
      locations: 3,
      frequency: "1 min"
    },
    {
      name: "CDN Performance",
      type: "website" as const,
      url: "https://cdn.example.com",
      status: "up" as const,
      responseTime: "89ms",
      uptime: "99.95%",
      locations: 8,
      frequency: "1 min"
    },
    {
      name: "Database API",
      type: "api" as const,
      url: "https://api.example.com/db/status",
      status: "up" as const,
      responseTime: "340ms",
      uptime: "99.8%",
      locations: 3,
      frequency: "2 min"
    }
  ];

  const realUserMetrics = [
    {
      name: "Page Load Time",
      value: "1.8s",
      change: "-0.2s",
      status: "good" as const
    },
    {
      name: "Time to Interactive",
      value: "2.4s",
      change: "+0.1s",
      status: "warning" as const
    },
    {
      name: "Bounce Rate",
      value: "24%",
      change: "-3%",
      status: "good" as const
    },
    {
      name: "Error Rate",
      value: "0.8%",
      change: "+0.2%",
      status: "warning" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Digital Experience Monitoring</h2>
          <p className="text-muted-foreground">
            Synthetic and Real User Monitoring with 8 global locations and AI-powered insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Session Replay
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Monitor
          </Button>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Synthetic Monitoring
            </CardTitle>
            <CardDescription>
              Proactive monitoring from multiple global locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">1 min</Badge>
                <span className="text-xs">Minimum poll frequency</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">8 locations</Badge>
                <span className="text-xs">Global monitoring points</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>On-premise poller support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Zero false alert protection</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Root cause analysis on downtime</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Video className="w-4 h-4 text-primary" />
                <span>Video-based RCA for transactions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Real User Monitoring
            </CardTitle>
            <CardDescription>
              Track actual user experiences and behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Front-end performance analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Single page application monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Geographic performance insights</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>JavaScript error tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>User session analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4 text-primary" />
                <span>Session replay capability</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real User Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Real User Performance Metrics
          </CardTitle>
          <CardDescription>
            Live performance data from actual user sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {realUserMetrics.map((metric, index) => (
              <RealUserMetric key={index} {...metric} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Synthetic Tests Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Synthetic Monitors</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {syntheticTests.map((test, index) => (
            <SyntheticTest key={index} {...test} />
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Intelligent anomaly detection and performance recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 dark:text-blue-100">Performance Anomaly Detected</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  Response time increased by 40% in the last hour. Possible cause: Database connection pool exhaustion.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <div className="font-medium text-amber-900 dark:text-amber-100">User Experience Alert</div>
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  High bounce rate detected from mobile users in EU region. Consider optimizing mobile experience.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900 dark:text-green-100">Performance Improvement</div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  CDN optimization has reduced average page load time by 25% across all regions.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}