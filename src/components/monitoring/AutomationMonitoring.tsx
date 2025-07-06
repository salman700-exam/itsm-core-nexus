import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Settings, 
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCw,
  Code,
  Webhook,
  MessageSquare,
  Phone,
  Server,
  Cloud,
  Activity
} from "lucide-react";

const AutomationRule = ({ 
  name, 
  trigger, 
  actions, 
  status, 
  executions, 
  lastRun,
  type
}: {
  name: string;
  trigger: string;
  actions: number;
  status: "active" | "paused" | "error";
  executions: number;
  lastRun: string;
  type: "script" | "webhook" | "cloud" | "notification";
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "paused":
        return <Pause className="w-4 h-4 text-warning" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "script":
        return <Code className="w-4 h-4 text-muted-foreground" />;
      case "webhook":
        return <Webhook className="w-4 h-4 text-muted-foreground" />;
      case "cloud":
        return <Cloud className="w-4 h-4 text-muted-foreground" />;
      case "notification":
        return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {getTypeIcon()}
            <Badge variant="outline" className="text-xs">{actions} actions</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Trigger: {trigger}</p>
        </div>
      </div>
      <div className="text-right">
        <Badge variant={getStatusVariant() as any} className="mb-1">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <div className="text-xs text-muted-foreground">
          {executions} runs • {lastRun}
        </div>
        <div className="flex gap-1 mt-2">
          <Button size="sm" variant="outline" className="h-6 px-2">
            <Play className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="h-6 px-2">
            <Settings className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const IntegrationCard = ({ 
  name, 
  type, 
  status, 
  description, 
  icon: Icon,
  connected
}: {
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  description: string;
  icon: any;
  connected: boolean;
}) => {
  const getStatusVariant = () => {
    switch (status) {
      case "connected":
        return "success";
      case "disconnected":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{type}</CardDescription>
            </div>
          </div>
          <Badge variant={getStatusVariant() as any} className="text-xs">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {connected ? "Active integration" : "Available"}
          </div>
          <Button size="sm" variant={connected ? "outline" : "default"}>
            {connected ? "Configure" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function AutomationMonitoring() {
  const automationRules = [
    {
      name: "High CPU Auto-Scale",
      trigger: "CPU > 80% for 5 minutes",
      actions: 3,
      status: "active" as const,
      executions: 47,
      lastRun: "2h ago",
      type: "cloud" as const
    },
    {
      name: "Server Restart on Memory Alert",
      trigger: "Memory > 90%",
      actions: 2,
      status: "active" as const,
      executions: 12,
      lastRun: "6h ago",
      type: "script" as const
    },
    {
      name: "SSL Expiry Notification",
      trigger: "SSL expires in 7 days",
      actions: 1,
      status: "paused" as const,
      executions: 3,
      lastRun: "1d ago",
      type: "notification" as const
    },
    {
      name: "Database Backup Verification",
      trigger: "Daily at 2:00 AM",
      actions: 4,
      status: "error" as const,
      executions: 365,
      lastRun: "Failed",
      type: "script" as const
    },
    {
      name: "API Failure Webhook",
      trigger: "API response time > 5s",
      actions: 1,
      status: "active" as const,
      executions: 89,
      lastRun: "30m ago",
      type: "webhook" as const
    }
  ];

  const integrations = [
    {
      name: "Slack",
      type: "Chat Platform",
      status: "connected" as const,
      description: "Send alerts and notifications to Slack channels",
      icon: MessageSquare,
      connected: true
    },
    {
      name: "Microsoft Teams",
      type: "Collaboration",
      status: "connected" as const,
      description: "Team notifications and incident updates",
      icon: MessageSquare,
      connected: true
    },
    {
      name: "PagerDuty",
      type: "Incident Management",
      status: "connected" as const,
      description: "Escalate critical alerts to on-call engineers",
      icon: Phone,
      connected: true
    },
    {
      name: "ServiceNow",
      type: "ITSM Platform",
      status: "disconnected" as const,
      description: "Create and update incidents automatically",
      icon: Server,
      connected: false
    },
    {
      name: "Zapier",
      type: "Automation Platform",
      status: "error" as const,
      description: "Connect with 5000+ apps and services",
      icon: Zap,
      connected: true
    },
    {
      name: "AWS",
      type: "Cloud Platform",
      status: "connected" as const,
      description: "Automate AWS resource management and scaling",
      icon: Cloud,
      connected: true
    }
  ];

  const recentExecutions = [
    {
      rule: "High CPU Auto-Scale",
      action: "Scale up EC2 instances",
      status: "success",
      timestamp: "2 hours ago",
      duration: "45s"
    },
    {
      rule: "API Failure Webhook",
      action: "Send Slack notification",
      status: "success",
      timestamp: "30 minutes ago",
      duration: "2s"
    },
    {
      rule: "Database Backup Verification", 
      action: "Verify backup integrity",
      status: "failed",
      timestamp: "12 hours ago",
      duration: "180s"
    },
    {
      rule: "Server Restart on Memory Alert",
      action: "Restart Apache service",
      status: "success",
      timestamp: "6 hours ago",
      duration: "15s"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">IT Automation & Integrations</h2>
          <p className="text-muted-foreground">
            Automate responses with scripts, server actions, and integrations with third-party tools
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Workflows
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Automation Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">3 paused, 1 error</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Executions Today</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">94% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12s</div>
            <p className="text-xs text-muted-foreground">Automation speed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Integrations</CardTitle>
            <Webhook className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">6 connected</p>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCw className="w-5 h-5" />
            Automation Rules
          </CardTitle>
          <CardDescription>
            Automated responses to monitoring alerts and conditions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {automationRules.map((rule, index) => (
            <AutomationRule key={index} {...rule} />
          ))}
          <Button variant="outline" className="w-full mt-4">
            View All Rules
          </Button>
        </CardContent>
      </Card>

      {/* Integrations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Third-Party Integrations</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} {...integration} />
          ))}
        </div>
      </div>

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Executions
          </CardTitle>
          <CardDescription>
            Latest automation rule executions and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExecutions.map((execution, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  {execution.status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  )}
                  <div>
                    <div className="font-medium">{execution.rule}</div>
                    <div className="text-sm text-muted-foreground">{execution.action}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{execution.duration}</div>
                  <div className="text-xs text-muted-foreground">{execution.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Features */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Capabilities</CardTitle>
          <CardDescription>
            Available automation actions and triggers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Script Actions
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Server restart/reboot</li>
                <li>• Service management</li>
                <li>• Custom shell scripts</li>
                <li>• File system operations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Cloud className="w-4 h-4 text-primary" />
                Cloud Actions
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AWS EC2 scaling</li>
                <li>• Azure VM management</li>
                <li>• VMware operations</li>
                <li>• Container orchestration</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Webhook className="w-4 h-4 text-primary" />
                Notifications
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Webhook triggers</li>
                <li>• Email/SMS alerts</li>
                <li>• Chat integrations</li>
                <li>• Incident management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}