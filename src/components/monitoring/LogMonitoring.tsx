import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Filter, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Settings,
  Plus,
  Clock,
  Database,
  Download
} from "lucide-react";

const LogEntry = ({ 
  timestamp, 
  level, 
  source, 
  message, 
  details 
}: {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  source: string;
  message: string;
  details?: string;
}) => {
  const getLevelIcon = () => {
    switch (level) {
      case "info":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case "warn":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "debug":
        return <Settings className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getLevelVariant = () => {
    switch (level) {
      case "info":
        return "secondary";
      case "warn":
        return "warning";
      case "error":
        return "destructive";
      case "debug":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getLevelIcon()}
          <Badge variant={getLevelVariant() as any} className="text-xs">
            {level.toUpperCase()}
          </Badge>
          <span className="text-sm text-muted-foreground">{source}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{timestamp}</span>
        </div>
      </div>
      
      <div className="text-sm font-medium">{message}</div>
      
      {details && (
        <div className="text-xs text-muted-foreground bg-muted p-2 rounded font-mono">
          {details}
        </div>
      )}
    </div>
  );
};

const LogSource = ({ 
  name, 
  type, 
  status, 
  logCount, 
  errorRate 
}: {
  name: string;
  type: string;
  status: "active" | "inactive" | "error";
  logCount: string;
  errorRate: string;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "inactive":
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-muted-foreground" />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{type}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right text-sm">
          <div className="font-medium">{logCount}</div>
          <div className="text-muted-foreground">logs/hour</div>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium">{errorRate}</div>
          <div className="text-muted-foreground">error rate</div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <Badge variant={getStatusVariant() as any} className="text-xs">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export function LogMonitoring() {
  const [searchQuery, setSearchQuery] = useState("");

  const logEntries = [
    {
      timestamp: "2024-01-15 14:32:45",
      level: "error" as const,
      source: "api-gateway",
      message: "Failed to connect to upstream service",
      details: "Connection timeout after 30 seconds. Service: user-service, Endpoint: /api/v1/users/123"
    },
    {
      timestamp: "2024-01-15 14:32:43",
      level: "warn" as const,
      source: "database",
      message: "Slow query detected",
      details: "Query execution time: 2.5s. Query: SELECT * FROM users WHERE created_at > '2024-01-01'"
    },
    {
      timestamp: "2024-01-15 14:32:41",
      level: "info" as const,
      source: "web-server",
      message: "User authentication successful",
      details: "User ID: 12345, IP: 192.168.1.100, User-Agent: Mozilla/5.0..."
    },
    {
      timestamp: "2024-01-15 14:32:38",
      level: "debug" as const,
      source: "cache-service",
      message: "Cache miss for key: user_profile_12345",
    },
    {
      timestamp: "2024-01-15 14:32:35",
      level: "error" as const,
      source: "payment-service",
      message: "Payment processing failed",
      details: "Error: Insufficient funds. Transaction ID: txn_1234567890, Amount: $99.99"
    }
  ];

  const logSources = [
    {
      name: "Application Logs",
      type: "JSON Format",
      status: "active" as const,
      logCount: "2,345",
      errorRate: "2.1%"
    },
    {
      name: "Web Server Access",
      type: "Apache Combined",
      status: "active" as const,
      logCount: "5,678",
      errorRate: "0.8%"
    },
    {
      name: "Database Audit",
      type: "PostgreSQL",
      status: "active" as const,
      logCount: "892",
      errorRate: "0.3%"
    },
    {
      name: "Security Events",
      type: "Syslog",
      status: "active" as const,
      logCount: "156",
      errorRate: "5.2%"
    },
    {
      name: "Legacy System",
      type: "Custom Format",
      status: "inactive" as const,
      logCount: "0",
      errorRate: "N/A"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Log Monitoring</h2>
          <p className="text-muted-foreground">
            Centralized log analysis with 100+ out-of-the-box log formats and query language support
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Log Source
          </Button>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Log Monitoring Features
            </CardTitle>
            <CardDescription>
              Advanced log collection and analysis capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>100+ out-of-the-box log formats</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Query language support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Search alerts & dashboards</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Real-time log streaming</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">3 mins</Badge>
                <span className="text-xs">Minimum alert frequency</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">1M</Badge>
                <span className="text-xs">Export logs limit</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Efficient log storage and retention policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>3-year data retention</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Compressed log storage</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Automated log rotation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Custom retention policies</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Log archiving & compliance</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>High-performance indexing</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Log Search
          </CardTitle>
          <CardDescription>
            Search and filter logs using advanced query language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search logs (e.g., level:error AND source:api-gateway)" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Log Sources</CardTitle>
          <CardDescription>
            Configured log sources and their current status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {logSources.map((source, index) => (
            <LogSource key={index} {...source} />
          ))}
        </CardContent>
      </Card>

      {/* Recent Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Log Entries</CardTitle>
          <CardDescription>
            Latest log entries from all monitored sources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {logEntries.map((entry, index) => (
            <LogEntry key={index} {...entry} />
          ))}
          <Button variant="outline" className="w-full mt-4">
            Load More Entries
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}