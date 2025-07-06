import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, MessageSquare, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Ticket,
  ArrowUpDown,
  CreditCard,
  AlertTriangle,
  Rocket,
  FolderKanban,
  ShoppingCart,
  Package,
  UserMinus,
  Bug,
  FileText,
  Map,
  Users
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search tickets, assets, or users..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Service Desk Quick Access */}
              <div className="flex items-center gap-1 mr-4">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Ticket className="w-4 h-4 mr-1" />
                  <span className="text-xs">Ticket</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ArrowUpDown className="w-4 h-4 mr-1" />
                  <span className="text-xs">Change</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <CreditCard className="w-4 h-4 mr-1" />
                  <span className="text-xs">Purchase</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  <span className="text-xs">Incident</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Rocket className="w-4 h-4 mr-1" />
                  <span className="text-xs">Release</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <FolderKanban className="w-4 h-4 mr-1" />
                  <span className="text-xs">Project</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  <span className="text-xs">Request</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Package className="w-4 h-4 mr-1" />
                  <span className="text-xs">Asset</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <UserMinus className="w-4 h-4 mr-1" />
                  <span className="text-xs">Offboard</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Bug className="w-4 h-4 mr-1" />
                  <span className="text-xs">Problem</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <FileText className="w-4 h-4 mr-1" />
                  <span className="text-xs">Contract</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Map className="w-4 h-4 mr-1" />
                  <span className="text-xs">Journey</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-xs">Agents</span>
                </Button>
              </div>
              
              <div className="w-px h-6 bg-border" />
              
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span className="text-xs">Chat with us</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <span className="ml-1 text-xs bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center">1</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}