import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon,
  Users, 
  Shield, 
  Mail, 
  Database, 
  Monitor, 
  Bot, 
  MessageCircle, 
  Phone, 
  Calendar, 
  AlertTriangle, 
  Target, 
  FileText, 
  Tag, 
  ThumbsUp, 
  CheckCircle, 
  RefreshCw, 
  ShoppingCart, 
  FileSignature, 
  UserMinus, 
  Route, 
  Zap, 
  Workflow, 
  Clock, 
  Trophy, 
  Package, 
  Cloud, 
  Globe, 
  Search, 
  Building, 
  DollarSign, 
  MapPin, 
  TrendingDown, 
  Link, 
  Activity, 
  UserCheck, 
  Briefcase, 
  GitBranch,
  CreditCard,
  AlertCircle,
  HelpCircle
} from "lucide-react";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </div>


        {/* Settings Sections */}
        <div className="grid gap-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage account information and related settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={SettingsIcon} title="Account" description="Manage account information and related settings" />
                <SettingCard icon={Users} title="Account mode" description="Switch between Employee Support Mode and Managed Services Mode" />
                <SettingCard icon={CreditCard} title="Plans & Billing" description="Manage plans, subscriptions and licenses" />
                <SettingCard icon={Building} title="Manage Workspaces" description="Manage workspaces, members and configurations" />
                <SettingCard icon={Briefcase} title="Service Desk Rebranding" description="Customize agent and requester portals to your brand needs" />
                <SettingCard icon={Shield} title="Service Desk Security" description="Secure your service desk with login policies and access restrictions" />
                <SettingCard icon={Database} title="Sandbox" description="Test and deploy changes between production and sandboxes" />
                <SettingCard icon={UserCheck} title="Day Passes" description="Manage passes for agents that require occasional service desk access" />
                <SettingCard icon={FileText} title="Audit Log" description="Keep track of all actions and changes across the service desk" />
                <SettingCard icon={Mail} title="Email Notifications" description="Configure automatic notifications to users based on specific events" />
                <SettingCard icon={Database} title="Data Archival" description="Archive old and inactive work items to improve system performance" />
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage users, groups and permissions across the service desk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Users} title="Agents" description="Manage all service desk agents, permissions and access rights" />
                <SettingCard icon={Shield} title="Roles" description="Create and modify roles to manage agent permissions" />
                <SettingCard icon={Building} title="Departments" description="Manage departments and their associated members" />
                <SettingCard icon={FileText} title="Department Fields" description="Create and manage fields that capture information for departments" />
                <SettingCard icon={UserCheck} title="Requesters" description="Manage requesters and their information" />
                <SettingCard icon={FileText} title="User Fields" description="Create and manage fields that capture information for users" />
                <SettingCard icon={Users} title="CAB" description="Set up a Change Advisory Board to evaluate changes before implementation" />
                <SettingCard icon={Users} title="Agent Groups" description="Create agent groups to streamline ticket assignment" />
                <SettingCard icon={Users} title="Requester Groups" description="Create requester groups and manage permissions for members" />
                <SettingCard icon={Calendar} title="Work Schedule" description="Assign work schedule to users to calculate their workload" />
              </div>
            </CardContent>
          </Card>

          {/* Freddy AI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Freddy AI
              </CardTitle>
              <CardDescription>Intelligent assistance for employees and agents powered by Freddy and Generative AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Bot} title="Freddy" description="Enable smart suggestions and conversational intelligence" />
              </div>
            </CardContent>
          </Card>

          {/* Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Channels
              </CardTitle>
              <CardDescription>Manage your support channels - email, phone, chat and more</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Mail} title="Email" description="Email Settings and Mailboxes" />
                <SettingCard icon={MessageCircle} title="Chat" description="Servicebot for Microsoft Teams" />
                <SettingCard icon={MessageCircle} title="Servicebot for slack" description="Enable Freddy AI to intelligently answer employee queries" />
                <SettingCard icon={MessageCircle} title="Freshchat" description="Enable chat on your support portal for real-time conversations" />
                <SettingCard icon={Phone} title="Freshcaller" description="Enable phone support, manage agents and convert calls into tickets" />
                <SettingCard icon={HelpCircle} title="Freshdesk" description="Unify employee and customer support for efficient resolution" />
                <SettingCard icon={Globe} title="Support Portal" description="Manage support portal access and restrict users" />
                <SettingCard icon={MessageCircle} title="Feedback Widget" description="Embed a ticket form in any webpage of your choice" />
                <SettingCard icon={Activity} title="Status Page" description="Communicate real-time updates on operational status" />
              </div>
            </CardContent>
          </Card>

          {/* Service Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Service Management
              </CardTitle>
              <CardDescription>Manage the end to end service delivery configurations for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Clock} title="Business Hours" description="Define the working hours for your service desk" />
                <SettingCard icon={Target} title="SLA and OLA Policies" description="Define service agreements with internal and external stakeholders" />
                <SettingCard icon={AlertTriangle} title="Priority Matrix" description="Configure auto-prioritization based on urgency and impact" />
                <SettingCard icon={FileText} title="Field Manager" description="Manage fields for forms and time entries" />
                <SettingCard icon={FileText} title="Form Templates" description="Pre-fill new forms for repetitive tickets/changes" />
                <SettingCard icon={Workflow} title="Business Rules for Forms" description="Define conditional logic to build dynamic forms" />
                <SettingCard icon={Tag} title="Tags" description="Manage tags that streamline search within your service desk" />
                <SettingCard icon={ThumbsUp} title="Surveys" description="Create surveys to track employee satisfaction and team efficiency" />
                <SettingCard icon={CheckCircle} title="Closure Rules" description="Define fulfilment criteria for closing tickets and problems" />
                <SettingCard icon={RefreshCw} title="Change Lifecycle" description="Control transitions within the lifecycle of a change" />
              </div>
            </CardContent>
          </Card>

          {/* Service Request Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Service Request Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={ShoppingCart} title="Service Catalog" description="Manage list of services and assets provided to your end-users" />
                <SettingCard icon={FileSignature} title="Document Templates" description="Create ready-to-use templates with formatting and signatures" />
                <SettingCard icon={UserMinus} title="Employee Offboarding" description="Streamline processes for stakeholders to offboard employees" />
                <SettingCard icon={Route} title="Journeys" description="Create automated processes for common journeys like onboarding" />
              </div>
            </CardContent>
          </Card>

          {/* Automation & Productivity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Automation & Productivity
              </CardTitle>
              <CardDescription>Supercharge your service desk with automations, integrations and agent productivity tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Workflow} title="Workflow Automator" description="Automate processes using a drag-and-drop workflow builder" />
                <SettingCard icon={Shield} title="Supervisor Rules" description="Run hourly checks to automate actions on matching tickets" />
                <SettingCard icon={Link} title="Orchestration Center" description="Automate processes across tools by integrating with third party apps" />
                <SettingCard icon={Zap} title="Scenario Automations" description="Create templates to perform multiple actions on a ticket" />
                <SettingCard icon={Shield} title="Credentials" description="Store credentials and reference them across forms and workflows" />
                <SettingCard icon={MessageCircle} title="Canned Responses" description="Precreate replies and quickly respond to tickets" />
                <SettingCard icon={Calendar} title="Scheduler" description="Schedule periodic ticket creation for repetitive tasks" />
                <SettingCard icon={Trophy} title="Leaderboard" description="Set up a point-based system for gamified ticket resolution" />
                <SettingCard icon={Mail} title="Email Commands" description="Create email shortcuts to perform tickets actions from your inbox" />
                <SettingCard icon={MessageCircle} title="Collaborate" description="Enable conversations using your collaboration tools" />
              </div>
            </CardContent>
          </Card>

          {/* Asset Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Asset Management
              </CardTitle>
              <CardDescription>Discover and manage assets and their related information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Package} title="Asset Types & Fields" description="Manage asset types and fields to capture asset information" />
                <SettingCard icon={Cloud} title="Cloud Management" description="Discover and manage your cloud resources with integrations" />
                <SettingCard icon={Globe} title="SaaS Management" description="Manage your SaaS apps by integrating with them" />
                <SettingCard icon={Search} title="Discovery Hub" description="Discover and manage your IT assets across their lifecycle" />
                <SettingCard icon={ShoppingCart} title="Product Catalog" description="Manage products currently used in your organization" />
                <SettingCard icon={Building} title="Vendors" description="Manage your vendors and their information" />
                <SettingCard icon={FileText} title="Vendor Fields" description="Create and manage fields that capture vendor information" />
                <SettingCard icon={FileText} title="Software Fields" description="Create and manage fields that capture software information" />
                <SettingCard icon={FileText} title="Contract Types" description="Manage default contract types and create new types" />
                <SettingCard icon={FileText} title="Purchase Order Fields" description="Create and manage fields for purchase orders" />
                <SettingCard icon={MapPin} title="Locations" description="Manage different locations referenced across the service desk" />
                <SettingCard icon={TrendingDown} title="Asset Depreciation" description="Calculate depreciation value of assets using three modes" />
                <SettingCard icon={Link} title="Relationship Types" description="Manage upstream and downstream relationship types for assets" />
              </div>
            </CardContent>
          </Card>

          {/* IT Operations Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                IT Operations Management
              </CardTitle>
              <CardDescription>Track and manage the health of your IT Infrastructure Operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={Monitor} title="Monitoring Tools" description="Integrate monitoring tools to manage all alerts on a single pane" />
                <SettingCard icon={Calendar} title="On-call schedules" description="Ensure 24x7 agent coverage through automated escalation" />
                <SettingCard icon={FileText} title="Post Incident Report Templates" description="Create templates for streamlined incident analysis" />
              </div>
            </CardContent>
          </Card>

          {/* Project & Workload Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Project & Workload Management
              </CardTitle>
              <CardDescription>Manage project and workload settings for your service desk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SettingCard icon={FileText} title="Project Fields" description="Create and manage fields to capture information about projects" />
                <SettingCard icon={MessageCircle} title="Project Collaboration" description="Integrate with collaboration platforms to converse about tasks" />
                <SettingCard icon={GitBranch} title="JIRA Import" description="Import projects and tasks from Jira to Freshservice" />
                <SettingCard icon={GitBranch} title="Devops Integrations" description="Integrate with source control tools to see code change details" />
                <SettingCard icon={Users} title="Workload Management" description="View, manage, and balance the workload of your team" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

interface SettingCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function SettingCard({ icon: Icon, title, description }: SettingCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}