import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus
} from "lucide-react";

const ServerCard = ({ 
  name, 
  type, 
  status, 
  cpu, 
  memory, 
  disk, 
  uptime 
}: {
  name: string;
  type: string;
  status: "online" | "offline" | "warning";
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "text-success";
      case "offline":
        return "text-destructive";
      case "warning":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "online":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "offline":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
    }
  };

  const getProgressColor = (value: number) => {
    if (value > 80) return "bg-destructive";
    if (value > 60) return "bg-warning";
    return "bg-success";
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{type}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge variant={status === "online" ? "success" : status === "offline" ? "destructive" : "warning"} className="text-xs">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span>CPU Usage</span>
            </div>
            <span className="font-medium">{cpu}%</span>
          </div>
          <Progress value={cpu} className={`h-2 ${getProgressColor(cpu)}`} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MemoryStick className="w-4 h-4 text-muted-foreground" />
              <span>Memory Usage</span>
            </div>
            <span className="font-medium">{memory}%</span>
          </div>
          <Progress value={memory} className={`h-2 ${getProgressColor(memory)}`} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span>Disk Usage</span>
            </div>
            <span className="font-medium">{disk}%</span>
          </div>
          <Progress value={disk} className={`h-2 ${getProgressColor(disk)}`} />
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-medium">{uptime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function InfrastructureMonitoring() {
  const servers = [
    {
      name: "Web Server 01",
      type: "Ubuntu 22.04 LTS",
      status: "online" as const,
      cpu: 45,
      memory: 68,
      disk: 32,
      uptime: "45d 12h 30m"
    },
    {
      name: "Database Primary",
      type: "PostgreSQL 15",
      status: "online" as const,
      cpu: 72,
      memory: 84,
      disk: 45,
      uptime: "23d 8h 15m"
    },
    {
      name: "API Server 02",
      type: "Node.js Runtime",
      status: "warning" as const,
      cpu: 89,
      memory: 92,
      disk: 67,
      uptime: "12d 4h 22m"
    },
    {
      name: "Cache Server",
      type: "Redis Cluster",
      status: "online" as const,
      cpu: 23,
      memory: 45,
      disk: 18,
      uptime: "67d 3h 45m"
    },
    {
      name: "File Server",
      type: "Windows Server 2022",
      status: "offline" as const,
      cpu: 0,
      memory: 0,
      disk: 78,
      uptime: "0d 0h 0m"
    },
    {
      name: "Backup Server",
      type: "CentOS 8 Stream",
      status: "online" as const,
      cpu: 15,
      memory: 34,
      disk: 89,
      uptime: "89d 15h 12m"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Infrastructure Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor servers, processes, and custom metrics with 300+ plugin integrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Server
          </Button>
        </div>
      </div>

      {/* Feature Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Features</CardTitle>
          <CardDescription>
            Comprehensive monitoring capabilities for your IT infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Standard Monitoring
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Standard events and metrics</li>
                <li>• Process and service monitoring</li>
                <li>• Resource check monitoring</li>
                <li>• Infrastructure events</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Plugin Integrations
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Over 300 plugin integrations</li>
                <li>• Custom metrics via plugins</li>
                <li>• Performance counters (1000+)</li>
                <li>• High availability poller</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                Advanced Features
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Poller group load balancing</li>
                <li>• Custom dashboards</li>
                <li>• Anomaly detection</li>
                <li>• Capacity monitoring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Server Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servers.map((server, index) => (
          <ServerCard key={index} {...server} />
        ))}
      </div>
    </div>
  );
}