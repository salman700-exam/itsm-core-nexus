import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useCustomers } from "@/contexts/CustomerContext";
import { 
  ArrowLeft,
  Cloud,
  Server,
  Settings,
  Activity,
  DollarSign,
  MapPin,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";

export function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { getCustomerById, updateCustomer } = useCustomers();
  const customer = getCustomerById(customerId || "");

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Customer Not Found</h2>
          <Button onClick={() => navigate("/monitoring")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Monitoring
          </Button>
        </div>
      </div>
    );
  }

  const handleToggleIntegration = (provider: 'aws' | 'azure' | 'gcp' | 'onPremises', enabled: boolean) => {
    const currentIntegrations = customer.cloudIntegrations || {};
    
    if (provider === 'onPremises') {
      updateCustomer(customer.id, {
        cloudIntegrations: {
          ...currentIntegrations,
          onPremises: enabled ? {
            connected: true,
            servers: 0,
            devices: 0
          } : undefined
        }
      });
    } else {
      updateCustomer(customer.id, {
        cloudIntegrations: {
          ...currentIntegrations,
          [provider]: enabled ? {
            connected: true,
            resources: 0,
            monthlySpend: 0,
            region: provider === 'aws' ? 'us-east-1' : 
                   provider === 'azure' ? 'eastus' : 'us-central1'
          } : undefined
        }
      });
    }
  };

  const getIntegrationStatus = (provider: 'aws' | 'azure' | 'gcp' | 'onPremises') => {
    return customer.cloudIntegrations?.[provider]?.connected || false;
  };

  const getStatusIcon = (connected: boolean) => {
    return connected ? 
      <CheckCircle2 className="w-4 h-4 text-success" /> : 
      <XCircle className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/monitoring")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{customer.company}</h1>
            <p className="text-muted-foreground">
              {customer.name} • {customer.email}
            </p>
          </div>
        </div>
        <Badge variant={customer.status === 'active' ? 'success' : 
                       customer.status === 'pending' ? 'warning' : 'secondary'}>
          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </Badge>
      </div>

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{customer.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Joined {customer.joinDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Status: {customer.status}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cloud Integrations */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* AWS Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-orange-500" />
                <CardTitle>Amazon Web Services</CardTitle>
              </div>
              {getStatusIcon(getIntegrationStatus('aws'))}
            </div>
            <CardDescription>
              AWS cloud infrastructure monitoring and management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable AWS Integration</span>
              <Switch 
                checked={getIntegrationStatus('aws')}
                onCheckedChange={(checked) => handleToggleIntegration('aws', checked)}
              />
            </div>
            {customer.cloudIntegrations?.aws && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Resources:</span>
                  <span>{customer.cloudIntegrations.aws.resources}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Spend:</span>
                  <span>${customer.cloudIntegrations.aws.monthlySpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span>{customer.cloudIntegrations.aws.region}</span>
                </div>
              </div>
            )}
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure AWS
            </Button>
          </CardContent>
        </Card>

        {/* Azure Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-500" />
                <CardTitle>Microsoft Azure</CardTitle>
              </div>
              {getStatusIcon(getIntegrationStatus('azure'))}
            </div>
            <CardDescription>
              Azure cloud platform monitoring and management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable Azure Integration</span>
              <Switch 
                checked={getIntegrationStatus('azure')}
                onCheckedChange={(checked) => handleToggleIntegration('azure', checked)}
              />
            </div>
            {customer.cloudIntegrations?.azure && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Resources:</span>
                  <span>{customer.cloudIntegrations.azure.resources}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Spend:</span>
                  <span>${customer.cloudIntegrations.azure.monthlySpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span>{customer.cloudIntegrations.azure.region}</span>
                </div>
              </div>
            )}
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure Azure
            </Button>
          </CardContent>
        </Card>

        {/* Google Cloud Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-green-500" />
                <CardTitle>Google Cloud Platform</CardTitle>
              </div>
              {getStatusIcon(getIntegrationStatus('gcp'))}
            </div>
            <CardDescription>
              GCP infrastructure monitoring and management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable GCP Integration</span>
              <Switch 
                checked={getIntegrationStatus('gcp')}
                onCheckedChange={(checked) => handleToggleIntegration('gcp', checked)}
              />
            </div>
            {customer.cloudIntegrations?.gcp && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Resources:</span>
                  <span>{customer.cloudIntegrations.gcp.resources}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Spend:</span>
                  <span>${customer.cloudIntegrations.gcp.monthlySpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span>{customer.cloudIntegrations.gcp.region}</span>
                </div>
              </div>
            )}
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure GCP
            </Button>
          </CardContent>
        </Card>

        {/* On-Premises Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-500" />
                <CardTitle>On-Premises</CardTitle>
              </div>
              {getStatusIcon(getIntegrationStatus('onPremises'))}
            </div>
            <CardDescription>
              Local infrastructure and server monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable On-Premises</span>
              <Switch 
                checked={getIntegrationStatus('onPremises')}
                onCheckedChange={(checked) => handleToggleIntegration('onPremises', checked)}
              />
            </div>
            {customer.cloudIntegrations?.onPremises && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Servers:</span>
                  <span>{customer.cloudIntegrations.onPremises.servers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Devices:</span>
                  <span>{customer.cloudIntegrations.onPremises.devices}</span>
                </div>
              </div>
            )}
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure On-Premises
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Monitoring Statistics
          </CardTitle>
          <CardDescription>
            Current monitoring status and metrics for {customer.company}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-success">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">245ms</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground">
                ${(customer.cloudIntegrations?.aws?.monthlySpend || 0) + 
                  (customer.cloudIntegrations?.azure?.monthlySpend || 0) + 
                  (customer.cloudIntegrations?.gcp?.monthlySpend || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Spend</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}