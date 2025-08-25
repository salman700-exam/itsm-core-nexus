import { useState } from "react";
import { useTickets } from "@/contexts/TicketContext";
import { useCustomers } from "@/contexts/CustomerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";

const TicketCard = ({ ticket, customerName }: { ticket: any; customerName: string }) => {
  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'open':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusVariant = () => {
    switch (ticket.status) {
      case 'open':
        return 'default';
      case 'in-progress':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getPriorityVariant = () => {
    switch (ticket.priority) {
      case 'low':
        return 'secondary';
      case 'medium':
        return 'default';
      case 'high':
        return 'warning';
      case 'critical':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-card-hover transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle className="text-lg">{ticket.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>#{ticket.ticket_number}</span>
                <span>•</span>
                <span>{customerName}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getPriorityVariant() as any}>
              {ticket.priority}
            </Badge>
            <Badge variant={getStatusVariant() as any}>
              {ticket.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ticket.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {ticket.description}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Created {new Date(ticket.created_at).toLocaleDateString()}</span>
            </div>
            {ticket.due_date && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Due {new Date(ticket.due_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  
  const { tickets, loading } = useTickets();
  const { customers, getCustomerById } = useCustomers();

  const filteredTickets = tickets.filter(ticket => {
    const customer = getCustomerById(ticket.customer_id || '');
    const customerName = customer?.name || 'Unknown';
    
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return <div className="text-center py-8">Loading tickets...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTickets.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            {tickets.length === 0 
              ? "No tickets found. Create your first ticket to get started."
              : "No tickets match your current filters."
            }
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const customer = getCustomerById(ticket.customer_id || '');
            const customerName = customer?.name || 'Unknown Customer';
            
            return (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                customerName={customerName}
              />
            );
          })
        )}
      </div>
    </div>
  );
};