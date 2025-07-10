import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCustomers } from "@/contexts/CustomerContext";
import { 
  ArrowLeft,
  Cloud,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Server,
  Activity,
  MapPin
} from "lucide-react";

export function CloudProviderDetails() {
  const { provider } = useParams();
  const navigate = useNavigate();
  const { getCustomersByCloudProvider, customers } = useCustomers();

  const providerCustomers = getCustomersByCloudProvider(provider as 'aws' | 'azure' | 'gcp');

  const getProviderInfo = () => {
    switch (provider) {
      case 'aws':
        return {
          name: 'Amazon Web Services',
          icon: <Cloud className="w-6 h-6 text-orange-500" />,
          color: 'text-orange-500',
          totalResources: providerCustomers.reduce((sum, customer) => {
            const integration = customer.cloudIntegrations?.find(i => i.provider === 'aws');
            return sum + (integration?.resources || 0);
          }, 0),
          totalSpend: providerCustomers.reduce((sum, customer) => {
            const integration = customer.cloudIntegrations?.find(i => i.provider === 'aws');
            return sum + (integration?.monthly_spend || 0);
          }, 0)
        };
      case 'azure':
        return {
          name: 'Microsoft Azure',
          icon: <Cloud className="w-6 h-6 text-blue-500" />,
          color: 'text-blue-500',
          totalResources: providerCustomers.reduce((sum, customer) => {
            const integration = customer.cloudIntegrations?.find(i => i.provider === 'azure');
            return sum + (integration?.resources || 0);
          }, 0),
          totalSpend: providerCustomers.reduce((sum, customer) => {
            const integration = customer.cloudIntegrations?.find(i => i.provider === 'azure');
            return sum + (integration?.monthly_spend || 0);
          }, 0)
        };
      case 'gcp':
        return {
          name: 'Google Cloud Platform',
          icon: <Cloud className="w-6 h-6 text-green-500" />,
          color: 'text-green-500',
          totalResources: providerCustomers.reduce((sum, customer) => {
            const integration = customer.cloudIntegrations?.find(i => i.provider === 'gcp');
            return sum + (integration?.resources || 0);
          }, 0),
          totalSpend: providerCustomers.reduce((sum, customer) => {
            const integration = customer.cloudIntegrations?.find(i => i.provider === 'gcp');
            return sum + (integration?.monthly_spend || 0);
          }, 0)
        };
      default:
        return {
          name: 'Unknown Provider',
          icon: <Cloud className="w-6 h-6" />,
          color: 'text-muted-foreground',
          totalResources: 0,
          totalSpend: 0
        };
    }
  };

  const providerInfo = getProviderInfo();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/monitoring")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Monitoring
          </Button>
          <div className="flex items-center gap-3">
            {providerInfo.icon}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{providerInfo.name}</h1>
              <p className="text-muted-foreground">
                {providerCustomers.length} customers • {providerInfo.totalResources} resources
              </p>
            </div>
          </div>
        </div>
        <Badge variant="success">Connected</Badge>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerCustomers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active on {providerInfo.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerInfo.totalResources}</div>
            <p className="text-xs text-muted-foreground">
              Across all customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${providerInfo.totalSpend.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Spend/Customer</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${providerCustomers.length > 0 ? Math.round(providerInfo.totalSpend / providerCustomers.length).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per customer monthly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Infrastructure & Billing</CardTitle>
          <CardDescription>
            Detailed breakdown of each customer's {providerInfo.name} usage and costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providerCustomers.map((customer) => {
              const integration = customer.cloudIntegrations?.find(i => i.provider === provider);
              
              return (
                <div key={customer.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {customer.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{customer.company}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {customer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Server className="w-3 h-3" />
                          {integration?.resources || 0} resources
                        </span>
                        {integration?.region && (
                          <span className="flex items-center gap-1">
                            <Cloud className="w-3 h-3" />
                            {integration.region}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      ${(integration?.monthly_spend || 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">monthly spend</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                        {customer.status}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/monitoring/customer/${customer.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {providerCustomers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No customers currently using {providerInfo.name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>
            Geographic distribution of {providerInfo.name} resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from(new Set(providerCustomers.map(c => {
              const integration = c.cloudIntegrations?.find(i => i.provider === provider);
              return integration?.region;
            }).filter(Boolean))).map((region) => {
              const regionCustomers = providerCustomers.filter(c => {
                const integration = c.cloudIntegrations?.find(i => i.provider === provider);
                return integration?.region === region;
              });
              const regionSpend = regionCustomers.reduce((sum, c) => {
                const integration = c.cloudIntegrations?.find(i => i.provider === provider);
                return sum + (integration?.monthly_spend || 0);
              }, 0);

              return (
                <div key={region} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{region}</div>
                    <Badge variant="outline">{regionCustomers.length} customers</Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${regionSpend.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Monthly spend in region
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}