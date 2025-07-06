import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Ticket,
  AlertTriangle,
  ShoppingCart,
  Bug,
  ArrowUpDown,
  Rocket,
  Package,
  FileText,
  CreditCard,
  FolderKanban,
  UserMinus,
  Map,
  Users
} from "lucide-react";

const TicketOption = ({ 
  icon: Icon, 
  title, 
  description, 
  color = "bg-primary"
}: {
  icon: any;
  title: string;
  description: string;
  color?: string;
}) => (
  <Card className="hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Tickets = () => {
  const ticketOptions = [
    {
      icon: Ticket,
      title: "Ticket",
      description: "Report an issue",
      color: "bg-red-500"
    },
    {
      icon: ArrowUpDown,
      title: "Changes",
      description: "Request for change",
      color: "bg-blue-500"
    },
    {
      icon: CreditCard,
      title: "Purchase Order",
      description: "Create a purchase order",
      color: "bg-gray-500"
    },
    {
      icon: AlertTriangle,
      title: "Major Incident",
      description: "Report a major issue",
      color: "bg-red-600"
    },
    {
      icon: Rocket,
      title: "Release",
      description: "Create a release",
      color: "bg-green-500"
    },
    {
      icon: FolderKanban,
      title: "Project",
      description: "Create a project",
      color: "bg-purple-500"
    },
    {
      icon: ShoppingCart,
      title: "Request",
      description: "Request a service",
      color: "bg-orange-500"
    },
    {
      icon: Package,
      title: "Asset",
      description: "Create an asset",
      color: "bg-amber-600"
    },
    {
      icon: UserMinus,
      title: "Offboarding Request",
      description: "Offboard employees",
      color: "bg-gray-600"
    },
    {
      icon: Bug,
      title: "Problem",
      description: "Report a problem",
      color: "bg-violet-500"
    },
    {
      icon: FileText,
      title: "Contract",
      description: "Create a contract",
      color: "bg-teal-500"
    },
    {
      icon: Map,
      title: "Journey Request",
      description: "Initiate a journey request",
      color: "bg-cyan-500"
    },
    {
      icon: Users,
      title: "Agents",
      description: "Invite your team",
      color: "bg-indigo-500"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Service Desk</h1>
          <p className="text-muted-foreground">
            Create and manage tickets in your service desk
          </p>
        </div>

        {/* Ticket Options Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ticketOptions.map((option, index) => (
            <TicketOption
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
              color={option.color}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Create your first ticket</h2>
          <p className="text-muted-foreground mb-4">
            Create tickets in your service desk using the options below
          </p>
          <Button size="lg">
            <Ticket className="w-4 h-4 mr-2" />
            Start Creating
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;