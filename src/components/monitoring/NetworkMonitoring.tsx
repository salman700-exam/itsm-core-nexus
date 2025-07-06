import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Router, 
  Wifi, 
  Shield, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus,
  Globe,
  Zap
} from "lucide-react";

const NetworkDevice = ({ 
  name, 
  type, 
  ip, 
  status, 
  bandwidth, 
  latency, 
  location 
}: {
  name: string;
  type: string;
  ip: string;
  status: "up" | "down" | "warning";
  bandwidth: string;
  latency: string;
  location: string;
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
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Router className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{type} • {ip}</CardDescription>
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
            <div className="text-sm text-muted-foreground">Bandwidth</div>
            <div className="font-semibold">{bandwidth}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Latency</div>
            <div className="font-semibold">{latency}</div>
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function NetworkMonitoring() {
  const networkDevices = [
    {
      name: "Core Router",
      type: "Cisco ASR 1000",
      ip: "192.168.1.1",
      status: "up" as const,
      bandwidth: "1.2 Gbps",
      latency: "1.2ms",
      location: "Data Center A"
    },
    {
      name: "Distribution Switch",
      type: "Juniper EX4300",
      ip: "192.168.1.10",
      status: "up" as const,
      bandwidth: "850 Mbps",
      latency: "0.8ms",
      location: "Floor 3"
    },
    {
      name: "Access Point 01",
      type: "Ubiquiti UniFi",
      ip: "192.168.2.50",
      status: "warning" as const,
      bandwidth: "450 Mbps",
      latency: "5.2ms",
      location: "Conference Room"
    },
    {
      name: "Firewall",
      type: "Fortinet FortiGate",
      ip: "10.0.0.1",
      status: "up" as const,
      bandwidth: "2.1 Gbps",
      latency: "0.5ms",
      location: "DMZ"
    },
    {
      name: "Load Balancer",
      type: "F5 BIG-IP",
      ip: "10.0.1.100",
      status: "down" as const,
      bandwidth: "0 Mbps",
      latency: "N/A",
      location: "Data Center B"
    },
    {
      name: "VPN Gateway",
      type: "Cisco ASA 5500",
      ip: "203.0.113.1",
      status: "up" as const,
      bandwidth: "320 Mbps",
      latency: "15.3ms",
      location: "Remote Office"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Network Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor network devices with 10,000+ device templates and topology mapping
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Topology View
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5" />
              Network Features
            </CardTitle>
            <CardDescription>
              Comprehensive network monitoring capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Over 10,000 device templates</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Layer 2 discovery</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Topology and Map view</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>SNMP traps monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>1000 performance counters</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>High availability poller</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Network Configuration Management
            </CardTitle>
            <CardDescription>
              Advanced NCM capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Network Configuration Management</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Firmware vulnerability management</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Compliance monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Poller group load balancing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-warning" />
                <span>Automated configuration backup</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-warning" />
                <span>Change detection alerts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Devices Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {networkDevices.map((device, index) => (
          <NetworkDevice key={index} {...device} />
        ))}
      </div>
    </div>
  );
}