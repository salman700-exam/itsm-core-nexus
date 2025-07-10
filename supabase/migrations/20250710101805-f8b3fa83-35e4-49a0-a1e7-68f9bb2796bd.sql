-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.customer_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE public.asset_status AS ENUM ('active', 'inactive', 'maintenance', 'retired');
CREATE TYPE public.asset_type AS ENUM ('hardware', 'software', 'network', 'mobile', 'cloud');
CREATE TYPE public.cloud_provider AS ENUM ('aws', 'azure', 'gcp');
CREATE TYPE public.project_status AS ENUM ('planning', 'active', 'on-hold', 'completed', 'cancelled');
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'agent', 'user');
CREATE TYPE public.incident_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  department TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  location TEXT,
  status customer_status DEFAULT 'pending',
  join_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cloud integrations table
CREATE TABLE public.cloud_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  provider cloud_provider NOT NULL,
  connected BOOLEAN DEFAULT FALSE,
  resources INTEGER DEFAULT 0,
  monthly_spend DECIMAL(10,2) DEFAULT 0,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(customer_id, provider)
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status ticket_status DEFAULT 'open',
  priority ticket_priority DEFAULT 'medium',
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES public.profiles(id),
  due_date TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  asset_tag TEXT UNIQUE,
  type asset_type NOT NULL,
  status asset_status DEFAULT 'active',
  model TEXT,
  manufacturer TEXT,
  serial_number TEXT,
  purchase_date DATE,
  warranty_expiry DATE,
  location TEXT,
  assigned_to UUID REFERENCES public.profiles(id),
  customer_id UUID REFERENCES public.customers(id),
  purchase_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_teams junction table
CREATE TABLE public.user_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, team_id)
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status project_status DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  manager_id UUID REFERENCES public.profiles(id),
  customer_id UUID REFERENCES public.customers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saas_applications table
CREATE TABLE public.saas_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  vendor TEXT,
  license_count INTEGER,
  monthly_cost DECIMAL(10,2),
  renewal_date DATE,
  manager_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create security_incidents table
CREATE TABLE public.security_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  severity incident_severity DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  assigned_to UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create automation_rules table
CREATE TABLE public.automation_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  trigger_conditions JSONB,
  actions JSONB,
  enabled BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_reports table
CREATE TABLE public.analytics_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  parameters JSONB,
  scheduled BOOLEAN DEFAULT FALSE,
  schedule_config JSONB,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cloud_integrations_updated_at BEFORE UPDATE ON public.cloud_integrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON public.assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_saas_applications_updated_at BEFORE UPDATE ON public.saas_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_security_incidents_updated_at BEFORE UPDATE ON public.security_incidents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON public.automation_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_analytics_reports_updated_at BEFORE UPDATE ON public.analytics_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate ticket numbers
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  sequence_part TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM NOW())::TEXT;
  SELECT LPAD((COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 5) AS INTEGER)), 0) + 1)::TEXT, 6, '0')
  INTO sequence_part
  FROM public.tickets
  WHERE ticket_number LIKE year_part || '%';
  
  RETURN year_part || sequence_part;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION public.set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_number IS NULL THEN
    NEW.ticket_number := public.generate_ticket_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ticket_number_trigger BEFORE INSERT ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.set_ticket_number();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloud_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saas_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Helper function for user role checking
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
DECLARE
  user_role_val user_role;
BEGIN
  SELECT role INTO user_role_val FROM public.profiles WHERE id = user_id;
  RETURN COALESCE(user_role_val, 'user'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for customers
CREATE POLICY "All authenticated users can view customers" ON public.customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can insert customers" ON public.customers FOR INSERT TO authenticated WITH CHECK (public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Managers and admins can update customers" ON public.customers FOR UPDATE TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Admins can delete customers" ON public.customers FOR DELETE TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for cloud_integrations
CREATE POLICY "All authenticated users can view cloud integrations" ON public.cloud_integrations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage cloud integrations" ON public.cloud_integrations FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for tickets
CREATE POLICY "All authenticated users can view tickets" ON public.tickets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create tickets" ON public.tickets FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update assigned tickets" ON public.tickets FOR UPDATE TO authenticated USING (assigned_to = auth.uid() OR created_by = auth.uid() OR public.get_user_role(auth.uid()) IN ('admin', 'manager'));
CREATE POLICY "Admins can delete tickets" ON public.tickets FOR DELETE TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for assets
CREATE POLICY "All authenticated users can view assets" ON public.assets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage assets" ON public.assets FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for teams
CREATE POLICY "All authenticated users can view teams" ON public.teams FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage teams" ON public.teams FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for user_teams
CREATE POLICY "All authenticated users can view team memberships" ON public.user_teams FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage team memberships" ON public.user_teams FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for projects
CREATE POLICY "All authenticated users can view projects" ON public.projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage projects" ON public.projects FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for saas_applications
CREATE POLICY "All authenticated users can view SaaS applications" ON public.saas_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage SaaS applications" ON public.saas_applications FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for security_incidents
CREATE POLICY "All authenticated users can view security incidents" ON public.security_incidents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create security incidents" ON public.security_incidents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Assigned users and managers can update incidents" ON public.security_incidents FOR UPDATE TO authenticated USING (assigned_to = auth.uid() OR public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for automation_rules
CREATE POLICY "All authenticated users can view automation rules" ON public.automation_rules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage automation rules" ON public.automation_rules FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for analytics_reports
CREATE POLICY "All authenticated users can view analytics reports" ON public.analytics_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers and admins can manage analytics reports" ON public.analytics_reports FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for settings
CREATE POLICY "All authenticated users can view settings" ON public.settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage settings" ON public.settings FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Insert some initial settings
INSERT INTO public.settings (key, value, description) VALUES
('system_name', '"ITSM Portal"', 'Name of the ITSM system'),
('default_sla_hours', '24', 'Default SLA response time in hours'),
('enable_notifications', 'true', 'Enable email notifications'),
('ticket_auto_assign', 'false', 'Automatically assign tickets to available agents');