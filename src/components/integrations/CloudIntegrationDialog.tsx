import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCloudIntegration } from "@/contexts/CloudIntegrationContext";
import { Cloud, Server, Key, Lock } from "lucide-react";

interface CloudIntegrationDialogProps {
  customerId: string;
  customerName: string;
  trigger?: React.ReactNode;
}

export const CloudIntegrationDialog = ({ customerId, customerName, trigger }: CloudIntegrationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState('aws');
  const { connectProvider } = useCloudIntegration();
  
  const [awsCredentials, setAwsCredentials] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1"
  });

  const [azureCredentials, setAzureCredentials] = useState({
    subscriptionId: "",
    clientId: "",
    clientSecret: "",
    tenantId: "",
    region: "East US"
  });

  const [gcpCredentials, setGcpCredentials] = useState({
    projectId: "",
    serviceAccountKey: "",
    region: "us-central1"
  });

  const [onPremiseCredentials, setOnPremiseCredentials] = useState({
    serverUrl: "",
    username: "",
    password: "",
    location: "On-Premise"
  });

  const handleConnect = async (provider: 'aws' | 'azure' | 'gcp') => {
    setLoading(true);
    
    try {
      let credentials;
      switch (provider) {
        case 'aws':
          credentials = awsCredentials;
          break;
        case 'azure':
          credentials = azureCredentials;
          break;
        case 'gcp':
          credentials = gcpCredentials;
          break;
      }

      await connectProvider(customerId, provider, credentials);
      setOpen(false);
      
      // Reset forms
      setAwsCredentials({ accessKeyId: "", secretAccessKey: "", region: "us-east-1" });
      setAzureCredentials({ subscriptionId: "", clientId: "", clientSecret: "", tenantId: "", region: "East US" });
      setGcpCredentials({ projectId: "", serviceAccountKey: "", region: "us-central1" });
      
    } catch (error) {
      console.error('Error connecting provider:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Cloud className="w-4 h-4 mr-2" />
            Connect Cloud Provider
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect Cloud Provider</DialogTitle>
          <DialogDescription>
            Connect {customerName} to their cloud infrastructure for monitoring and management.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeProvider} onValueChange={setActiveProvider} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="aws">AWS</TabsTrigger>
            <TabsTrigger value="azure">Azure</TabsTrigger>
            <TabsTrigger value="gcp">GCP</TabsTrigger>
          </TabsList>

          <TabsContent value="aws" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-orange-500" />
                  Amazon Web Services
                </CardTitle>
                <CardDescription>
                  Connect to AWS to monitor EC2 instances, S3 buckets, RDS databases, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aws-access-key">Access Key ID</Label>
                  <Input
                    id="aws-access-key"
                    placeholder="AKIAIOSFODNN7EXAMPLE"
                    value={awsCredentials.accessKeyId}
                    onChange={(e) => setAwsCredentials(prev => ({ ...prev, accessKeyId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aws-secret-key">Secret Access Key</Label>
                  <Input
                    id="aws-secret-key"
                    type="password"
                    placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    value={awsCredentials.secretAccessKey}
                    onChange={(e) => setAwsCredentials(prev => ({ ...prev, secretAccessKey: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aws-region">Default Region</Label>
                  <Input
                    id="aws-region"
                    placeholder="us-east-1"
                    value={awsCredentials.region}
                    onChange={(e) => setAwsCredentials(prev => ({ ...prev, region: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={() => handleConnect('aws')} 
                  disabled={loading || !awsCredentials.accessKeyId || !awsCredentials.secretAccessKey}
                  className="w-full"
                >
                  {loading ? "Connecting..." : "Connect AWS Account"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="azure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  Microsoft Azure
                </CardTitle>
                <CardDescription>
                  Connect to Azure to monitor VMs, Storage Accounts, SQL Databases, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="azure-subscription">Subscription ID</Label>
                  <Input
                    id="azure-subscription"
                    placeholder="12345678-1234-1234-1234-123456789012"
                    value={azureCredentials.subscriptionId}
                    onChange={(e) => setAzureCredentials(prev => ({ ...prev, subscriptionId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-client-id">Client ID</Label>
                  <Input
                    id="azure-client-id"
                    placeholder="12345678-1234-1234-1234-123456789012"
                    value={azureCredentials.clientId}
                    onChange={(e) => setAzureCredentials(prev => ({ ...prev, clientId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-client-secret">Client Secret</Label>
                  <Input
                    id="azure-client-secret"
                    type="password"
                    placeholder="Your client secret"
                    value={azureCredentials.clientSecret}
                    onChange={(e) => setAzureCredentials(prev => ({ ...prev, clientSecret: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="azure-tenant">Tenant ID</Label>
                  <Input
                    id="azure-tenant"
                    placeholder="12345678-1234-1234-1234-123456789012"
                    value={azureCredentials.tenantId}
                    onChange={(e) => setAzureCredentials(prev => ({ ...prev, tenantId: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={() => handleConnect('azure')} 
                  disabled={loading || !azureCredentials.subscriptionId || !azureCredentials.clientId}
                  className="w-full"
                >
                  {loading ? "Connecting..." : "Connect Azure Account"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gcp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-green-500" />
                  Google Cloud Platform
                </CardTitle>
                <CardDescription>
                  Connect to GCP to monitor Compute Engine, Cloud Storage, BigQuery, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gcp-project">Project ID</Label>
                  <Input
                    id="gcp-project"
                    placeholder="my-project-123456"
                    value={gcpCredentials.projectId}
                    onChange={(e) => setGcpCredentials(prev => ({ ...prev, projectId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gcp-service-account">Service Account Key (JSON)</Label>
                  <textarea
                    id="gcp-service-account"
                    className="w-full min-h-[100px] p-3 border border-input rounded-md text-sm"
                    placeholder='{"type": "service_account", "project_id": "..."}'
                    value={gcpCredentials.serviceAccountKey}
                    onChange={(e) => setGcpCredentials(prev => ({ ...prev, serviceAccountKey: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={() => handleConnect('gcp')} 
                  disabled={loading || !gcpCredentials.projectId || !gcpCredentials.serviceAccountKey}
                  className="w-full"
                >
                  {loading ? "Connecting..." : "Connect GCP Project"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};