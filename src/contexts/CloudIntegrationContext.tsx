import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface CloudResource {
  id: string;
  name: string;
  type: string;
  region: string;
  status: 'running' | 'stopped' | 'pending' | 'error';
  cost: number;
  tags?: string[];
}

export interface CloudIntegrationData {
  id: string;
  customer_id: string;
  provider: 'aws' | 'azure' | 'gcp';
  connected: boolean;
  resources: number;
  monthly_spend: number;
  region: string;
  credentials?: {
    accessKeyId?: string;
    secretAccessKey?: string;
    subscriptionId?: string;
    projectId?: string;
  };
  resourceDetails?: CloudResource[];
}

interface CloudIntegrationContextType {
  integrations: CloudIntegrationData[];
  loading: boolean;
  connectProvider: (customerId: string, provider: 'aws' | 'azure' | 'gcp', credentials: any) => Promise<void>;
  disconnectProvider: (integrationId: string) => Promise<void>;
  refreshIntegrations: () => Promise<void>;
  getCustomerIntegrations: (customerId: string) => CloudIntegrationData[];
  syncResources: (integrationId: string) => Promise<void>;
}

const CloudIntegrationContext = createContext<CloudIntegrationContextType | undefined>(undefined);

export const useCloudIntegration = () => {
  const context = useContext(CloudIntegrationContext);
  if (!context) {
    throw new Error('useCloudIntegration must be used within a CloudIntegrationProvider');
  }
  return context;
};

export const CloudIntegrationProvider = ({ children }: { children: ReactNode }) => {
  const [integrations, setIntegrations] = useState<CloudIntegrationData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('cloud_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setIntegrations(data || []);
    } catch (error) {
      console.error('Error fetching cloud integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchIntegrations();
    }
  }, [user]);

  const connectProvider = async (customerId: string, provider: 'aws' | 'azure' | 'gcp', credentials: any) => {
    try {
      setLoading(true);
      
      // Simulate connecting to cloud provider and fetching initial data
      const mockResources = Math.floor(Math.random() * 50) + 1;
      const mockSpend = Math.floor(Math.random() * 10000) + 500;
      
      const { data, error } = await supabase
        .from('cloud_integrations')
        .insert([{
          customer_id: customerId,
          provider,
          connected: true,
          resources: mockResources,
          monthly_spend: mockSpend,
          region: provider === 'aws' ? 'us-east-1' : provider === 'azure' ? 'East US' : 'us-central1'
        }])
        .select()
        .single();

      if (error) throw error;

      setIntegrations(prev => [data, ...prev]);
      toast.success(`${provider.toUpperCase()} integration connected successfully`);
      
      // Simulate fetching resources
      await syncResources(data.id);
      
    } catch (error) {
      console.error('Error connecting provider:', error);
      toast.error('Failed to connect cloud provider');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectProvider = async (integrationId: string) => {
    try {
      const { error } = await supabase
        .from('cloud_integrations')
        .update({ connected: false })
        .eq('id', integrationId);

      if (error) throw error;

      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: false }
          : integration
      ));
      
      toast.success('Cloud provider disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting provider:', error);
      toast.error('Failed to disconnect cloud provider');
      throw error;
    }
  };

  const syncResources = async (integrationId: string) => {
    try {
      // Simulate fetching resources from cloud provider
      const mockResourceCount = Math.floor(Math.random() * 50) + 1;
      const mockSpend = Math.floor(Math.random() * 10000) + 500;
      
      const { error } = await supabase
        .from('cloud_integrations')
        .update({ 
          resources: mockResourceCount,
          monthly_spend: mockSpend 
        })
        .eq('id', integrationId);

      if (error) throw error;

      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              resources: mockResourceCount, 
              monthly_spend: mockSpend 
            }
          : integration
      ));
      
      toast.success('Resources synced successfully');
    } catch (error) {
      console.error('Error syncing resources:', error);
      toast.error('Failed to sync resources');
      throw error;
    }
  };

  const getCustomerIntegrations = (customerId: string) => {
    return integrations.filter(integration => integration.customer_id === customerId);
  };

  const refreshIntegrations = async () => {
    await fetchIntegrations();
  };

  return (
    <CloudIntegrationContext.Provider value={{
      integrations,
      loading,
      connectProvider,
      disconnectProvider,
      refreshIntegrations,
      getCustomerIntegrations,
      syncResources
    }}>
      {children}
    </CloudIntegrationContext.Provider>
  );
};