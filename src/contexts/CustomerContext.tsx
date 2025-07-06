import { createContext, useContext, useState, ReactNode } from "react";

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  cloudIntegrations?: {
    aws?: {
      connected: boolean;
      resources: number;
      monthlySpend: number;
      region: string;
    };
    azure?: {
      connected: boolean;
      resources: number;
      monthlySpend: number;
      region: string;
    };
    gcp?: {
      connected: boolean;
      resources: number;
      monthlySpend: number;
      region: string;
    };
    onPremises?: {
      connected: boolean;
      servers: number;
      devices: number;
    };
  };
}

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  getCustomerById: (id: string) => Customer | undefined;
  getCustomersByCloudProvider: (provider: 'aws' | 'azure' | 'gcp') => Customer[];
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Smith",
      company: "TechCorp Inc",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      status: "active",
      joinDate: "Jan 2024",
      cloudIntegrations: {
        aws: {
          connected: true,
          resources: 45,
          monthlySpend: 3200,
          region: "us-east-1"
        },
        azure: {
          connected: true,
          resources: 23,
          monthlySpend: 1800,
          region: "eastus"
        }
      }
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "Digital Solutions",
      email: "sarah@digitalsol.com",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
      status: "active",
      joinDate: "Feb 2024",
      cloudIntegrations: {
        aws: {
          connected: true,
          resources: 67,
          monthlySpend: 4500,
          region: "us-west-2"
        },
        gcp: {
          connected: true,
          resources: 34,
          monthlySpend: 2100,
          region: "us-central1"
        }
      }
    },
    {
      id: "3",
      name: "Mike Davis",
      company: "CloudTech Ltd",
      email: "mike.davis@cloudtech.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      status: "pending",
      joinDate: "Mar 2024",
      cloudIntegrations: {
        azure: {
          connected: true,
          resources: 29,
          monthlySpend: 2200,
          region: "southcentralus"
        },
        onPremises: {
          connected: true,
          servers: 12,
          devices: 45
        }
      }
    },
    {
      id: "4",
      name: "Emily Wilson",
      company: "StartupHub",
      email: "emily@startuphub.io",
      phone: "+1 (555) 321-0987",
      location: "Seattle, WA",
      status: "inactive",
      joinDate: "Dec 2023",
      cloudIntegrations: {
        gcp: {
          connected: true,
          resources: 18,
          monthlySpend: 950,
          region: "us-west1"
        }
      }
    }
  ]);

  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const getCustomerById = (id: string) => {
    return customers.find(customer => customer.id === id);
  };

  const getCustomersByCloudProvider = (provider: 'aws' | 'azure' | 'gcp') => {
    return customers.filter(customer => 
      customer.cloudIntegrations?.[provider]?.connected
    );
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      addCustomer,
      updateCustomer,
      getCustomerById,
      getCustomersByCloudProvider
    }}>
      {children}
    </CustomerContext.Provider>
  );
};