import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Ticket, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Package,
  BarChart3,
  RefreshCw,
  FileText,
  Plus
} from "lucide-react";

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = "up",
  variant = "default" 
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "destructive";
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-border bg-card";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`${getVariantStyles()} hover:shadow-card-hover transition-all duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getTrendColor()} flex items-center gap-1 mt-1`}>
            <TrendingUp className="h-3 w-3" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const RecentTicket = ({ 
  id, 
  title, 
  priority, 
  status, 
  assignee 
}: {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  assignee: string;
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "warning";
      case "Low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "destructive";
      case "In Progress":
        return "warning";
      case "Resolved":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">#{id}</span>
          <Badge variant={getPriorityColor(priority) as any} className="text-xs">
            {priority}
          </Badge>
        </div>
        <p className="text-sm text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground">Assigned to {assignee}</p>
      </div>
      <Badge variant={getStatusColor(status) as any}>
        {status}
      </Badge>
    </div>
  );
};

export function Dashboard() {
  const recentTickets = [
    {
      id: "INC001234",
      title: "Email server not responding",
      priority: "High" as const,
      status: "In Progress" as const,
      assignee: "John Smith"
    },
    {
      id: "REQ001235",
      title: "New software installation request",
      priority: "Medium" as const,
      status: "Open" as const,
      assignee: "Sarah Johnson"
    },
    {
      id: "INC001236",
      title: "Network connectivity issues",
      priority: "High" as const,
      status: "Open" as const,
      assignee: "Mike Chen"
    },
    {
      id: "CHG001237",
      title: "Database server maintenance",
      priority: "Low" as const,
      status: "Resolved" as const,
      assignee: "Lisa Davis"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ITSM Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your IT services.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Open Incidents"
          value={23}
          change="+2 from yesterday"
          icon={AlertTriangle}
          variant="destructive"
          trend="up"
        />
        <MetricCard
          title="Service Requests"
          value={15}
          change="+5 this week"
          icon={Ticket}
          trend="up"
        />
        <MetricCard
          title="Avg Resolution Time"
          value="4.2h"
          change="-0.5h from last week"
          icon={Clock}
          variant="success"
          trend="up"
        />
        <MetricCard
          title="Active Assets"
          value={1247}
          change="+12 this month"
          icon={Package}
          trend="up"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Recent Tickets
            </CardTitle>
            <CardDescription>
              Latest incidents and service requests requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTickets.map((ticket, index) => (
              <RecentTicket key={index} {...ticket} />
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Tickets
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Service Health
            </CardTitle>
            <CardDescription>
              Current status of key IT services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email Services</span>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network Infrastructure</span>
              <Badge variant="warning">Degraded</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Database Servers</span>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Web Applications</span>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">File Storage</span>
              <Badge variant="destructive">Down</Badge>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Service Status
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and frequently used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs">Report Incident</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <Ticket className="w-5 h-5" />
              <span className="text-xs">Service Request</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Change Request</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <Package className="w-5 h-5" />
              <span className="text-xs">Asset Lookup</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <Users className="w-5 h-5" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-20">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}