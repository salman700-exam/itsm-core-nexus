import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useCustomers } from "@/contexts/CustomerContext";
import { 
  ArrowLeft,
  Cloud,
  DollarSign,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Server,
  Activity,
  TrendingUp,
  Settings
} from "lucide-react";

export function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { getCustomerById, updateCustomer } = useCustomers();
  
  const customer = getCustomerById(customerId!);

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/monitoring")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Monitoring
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Customer Not Found</h1>
        </div>
      </div>
    );
  }

  const getIntegration = (provider: 'aws' | 'azure' | 'gcp') => {
    return customer.cloudIntegrations?.find(i => i.provider === provider);
  };

  const handleToggleIntegration = async (provider: 'aws' | 'azure' | 'gcp', enabled: boolean) => {
    // This would typically be handled by a more sophisticated cloud integration management system
    console.log(`Toggle ${provider} integration for customer ${customer.id}: ${enabled}`);
  };

  const totalMonthlySpend = customer.cloudIntegrations?.reduce((sum, integration) => 
    sum + (integration.monthly_spend || 0), 0) || 0;

  const totalResources = customer.cloudIntegrations?.reduce((sum, integration) => 
    sum + (integration.resources || 0), 0) || 0;

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
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">
                {customer.company.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{customer.company}</h1>
              <p className="text-muted-foreground">
                {customer.name} • {customer.email}
              </p>
            </div>
          </div>
        </div>
        <Badge variant={customer.status === 'active' ? 'success' : customer.status === 'pending' ? 'warning' : 'secondary'}>
          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </Badge>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>
            Basic customer details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Company</div>
                <div className="font-medium">{customer.company}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">{customer.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{customer.phone || 'Not provided'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{customer.location || 'Not provided'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Joined</div>
                <div className="font-medium">{new Date(customer.join_date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlySpend.toLocaleString()}</div>
            <p className="text-xs text-success flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResources}</div>
            <p className="text-xs text-muted-foreground">
              Across all cloud providers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customer.cloudIntegrations?.filter(i => i.connected).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Cloud providers connected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{customer.status}</div>
            <p className="text-xs text-muted-foreground">
              Current account status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AWS Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-orange-500" />
              <div>
                <CardTitle>Amazon Web Services</CardTitle>
                <CardDescription>AWS cloud infrastructure and services</CardDescription>
              </div>
            </div>
            <Switch 
              checked={getIntegration('aws')?.connected || false}
              onCheckedChange={(checked) => handleToggleIntegration('aws', checked)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {getIntegration('aws')?.connected ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Resources</div>
                <div className="text-2xl font-bold text-orange-500">
                  {getIntegration('aws')?.resources || 0}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Monthly Spend</div>
                <div className="text-2xl font-bold text-orange-500">
                  ${(getIntegration('aws')?.monthly_spend || 0).toLocaleString()}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Region</div>
                <div className="text-2xl font-bold text-orange-500">
                  {getIntegration('aws')?.region || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              AWS integration is not enabled for this customer
            </div>
          )}
        </CardContent>
      </Card>

      {/* Azure Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-blue-500" />
              <div>
                <CardTitle>Microsoft Azure</CardTitle>
                <CardDescription>Azure cloud platform and services</CardDescription>
              </div>
            </div>
            <Switch 
              checked={getIntegration('azure')?.connected || false}
              onCheckedChange={(checked) => handleToggleIntegration('azure', checked)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {getIntegration('azure')?.connected ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Resources</div>
                <div className="text-2xl font-bold text-blue-500">
                  {getIntegration('azure')?.resources || 0}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Monthly Spend</div>
                <div className="text-2xl font-bold text-blue-500">
                  ${(getIntegration('azure')?.monthly_spend || 0).toLocaleString()}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Region</div>
                <div className="text-2xl font-bold text-blue-500">
                  {getIntegration('azure')?.region || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Azure integration is not enabled for this customer
            </div>
          )}
        </CardContent>
      </Card>

      {/* GCP Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-green-500" />
              <div>
                <CardTitle>Google Cloud Platform</CardTitle>
                <CardDescription>GCP services and infrastructure</CardDescription>
              </div>
            </div>
            <Switch 
              checked={getIntegration('gcp')?.connected || false}
              onCheckedChange={(checked) => handleToggleIntegration('gcp', checked)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {getIntegration('gcp')?.connected ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Resources</div>
                <div className="text-2xl font-bold text-green-500">
                  {getIntegration('gcp')?.resources || 0}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Monthly Spend</div>
                <div className="text-2xl font-bold text-green-500">
                  ${(getIntegration('gcp')?.monthly_spend || 0).toLocaleString()}
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground">Region</div>
                <div className="text-2xl font-bold text-green-500">
                  {getIntegration('gcp')?.region || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              GCP integration is not enabled for this customer
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions for managing this customer's account and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-6">
              <Settings className="w-6 h-6" />
              <span>Manage Integrations</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-6">
              <DollarSign className="w-6 h-6" />
              <span>Billing History</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-6">
              <Activity className="w-6 h-6" />
              <span>Usage Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-6">
              <Server className="w-6 h-6" />
              <span>Resource Manager</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}