import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "@/contexts/CustomerContext";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud, 
  DollarSign, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus,
  Building,
  CreditCard,
  BarChart3
} from "lucide-react";

const CloudProvider = ({ 
  name, 
  logo, 
  spend, 
  change, 
  resources, 
  status,
  provider,
  navigate
}: {
  name: string;
  logo: string;
  spend: string;
  change: string;
  resources: number;
  status: "connected" | "warning" | "error";
  provider: string;
  navigate: (path: string) => void;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case "connected":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getChangeColor = () => {
    return change.startsWith('+') ? 'text-destructive' : 'text-success';
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{resources} resources</CardDescription>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Monthly Spend</span>
          </div>
          <div className="text-right">
            <div className="font-semibold">{spend}</div>
            <div className={`text-xs ${getChangeColor()}`}>{change}</div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/monitoring/cloud/${provider}`)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BusinessUnit = ({ 
  name, 
  budget, 
  spent, 
  remaining, 
  services 
}: {
  name: string;
  budget: number;
  spent: number;
  remaining: number;
  services: string[];
}) => {
  const spentPercentage = (spent / budget) * 100;
  
  const getBudgetColor = () => {
    if (spentPercentage > 90) return "text-destructive";
    if (spentPercentage > 75) return "text-warning";
    return "text-success";
  };

  return (
    <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{name}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {services.length} services
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Budget Usage</span>
          <span className={`font-medium ${getBudgetColor()}`}>
            ${spent.toLocaleString()} / ${budget.toLocaleString()}
          </span>
        </div>
        <Progress 
          value={spentPercentage} 
          className={`h-2 ${spentPercentage > 90 ? "bg-destructive" : spentPercentage > 75 ? "bg-warning" : "bg-success"}`} 
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{spentPercentage.toFixed(1)}% used</span>
          <span>${remaining.toLocaleString()} remaining</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex flex-wrap gap-1">
          {services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{services.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export function CloudMonitoring() {
  const navigate = useNavigate();
  const { getCustomersByCloudProvider } = useCustomers();

  const awsCustomers = getCustomersByCloudProvider('aws');
  const azureCustomers = getCustomersByCloudProvider('azure');
  const gcpCustomers = getCustomersByCloudProvider('gcp');

  const getTotalResources = (customers: any[], provider: string) => {
    return customers.reduce((sum, customer) => {
      const integration = customer.cloudIntegrations?.[provider];
      return sum + (integration?.resources || 0);
    }, 0);
  };

  const getTotalSpend = (customers: any[], provider: string) => {
    return customers.reduce((sum, customer) => {
      const integration = customer.cloudIntegrations?.[provider];
      return sum + (integration?.monthlySpend || 0);
    }, 0);
  };

  const cloudProviders = [
    {
      name: "Amazon Web Services",
      logo: "aws",
      provider: "aws",
      spend: `$${getTotalSpend(awsCustomers, 'aws').toLocaleString()}`,
      change: "+8.5%",
      resources: getTotalResources(awsCustomers, 'aws'),
      status: "connected" as const
    },
    {
      name: "Microsoft Azure",
      logo: "azure",
      provider: "azure",
      spend: `$${getTotalSpend(azureCustomers, 'azure').toLocaleString()}`,
      change: "-2.1%",
      resources: getTotalResources(azureCustomers, 'azure'),
      status: "connected" as const
    },
    {
      name: "Google Cloud Platform",
      logo: "gcp",
      provider: "gcp",
      spend: `$${getTotalSpend(gcpCustomers, 'gcp').toLocaleString()}`,
      change: "+15.3%",
      resources: getTotalResources(gcpCustomers, 'gcp'),
      status: "warning" as const
    },
    {
      name: "DigitalOcean",
      logo: "do",
      provider: "digitalocean",
      spend: "$1,240",
      change: "+5.2%",
      resources: 23,
      status: "connected" as const
    }
  ];

  const businessUnits = [
    {
      name: "Engineering",
      budget: 25000,
      spent: 18750,
      remaining: 6250,
      services: ["EC2", "RDS", "S3", "Lambda", "CloudFront"]
    },
    {
      name: "Marketing",
      budget: 8000,
      spent: 7200,
      remaining: 800,
      services: ["Analytics", "CDN", "Storage"]
    },
    {
      name: "Sales",
      budget: 5000,
      spent: 3200,
      remaining: 1800,
      services: ["CRM", "Email", "APIs"]
    },
    {
      name: "Operations",
      budget: 15000,
      spent: 12300,
      remaining: 2700,
      services: ["Monitoring", "Backup", "Security", "Networking"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cloud Spend Management</h2>
          <p className="text-muted-foreground">
            Multi-cloud cost optimization and spend analysis across all providers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              CloudSpend Features
            </CardTitle>
            <CardDescription>
              Comprehensive cloud cost management capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Multi-cloud support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Business Units (BUs) management</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Spend analysis & optimization</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Resource explorer</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Budget management & alerts</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Multi-currency support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Cost Optimization
            </CardTitle>
            <CardDescription>
              Intelligent cost recommendations and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Detailed reports & analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Tag profiles for cost allocation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Mobile application access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">Guidance</Badge>
                <span className="text-xs">Cost optimization practices</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">Guidance</Badge>
                <span className="text-xs">Security best practices</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">Guidance</Badge>
                <span className="text-xs">Availability optimization</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Providers */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Cloud Providers</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cloudProviders.map((provider, index) => (
            <CloudProvider key={index} {...provider} navigate={navigate} />
          ))}
        </div>
      </div>

      {/* Business Units */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Business Units</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {businessUnits.map((unit, index) => (
            <BusinessUnit key={index} {...unit} />
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Spend Summary
          </CardTitle>
          <CardDescription>
            Monthly cloud spend across all providers and business units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                ${(getTotalSpend(awsCustomers, 'aws') + getTotalSpend(azureCustomers, 'azure') + getTotalSpend(gcpCustomers, 'gcp') + 1240).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Monthly Spend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">$3,240</div>
              <div className="text-sm text-muted-foreground">Savings This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">$8,750</div>
              <div className="text-sm text-muted-foreground">Budget Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {getTotalResources(awsCustomers, 'aws') + getTotalResources(azureCustomers, 'azure') + getTotalResources(gcpCustomers, 'gcp') + 23}
              </div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}