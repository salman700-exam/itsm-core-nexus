import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, MessageSquare, Plus, Grid3X3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span className="text-xs">Chat with us</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Ticket className="w-4 h-4 mr-2" />
                    Ticket
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Change
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Purchase Order
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Major Incident
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Rocket className="w-4 h-4 mr-2" />
                    Release
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderKanban className="w-4 h-4 mr-2" />
                    Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Request
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="w-4 h-4 mr-2" />
                    Asset
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserMinus className="w-4 h-4 mr-2" />
                    Offboarding Request
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bug className="w-4 h-4 mr-2" />
                    Problem
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    Contract
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Map className="w-4 h-4 mr-2" />
                    Journey Request
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="w-4 h-4 mr-2" />
                    Agents
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
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