import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_by?: string;
  assigned_to?: string;
  customer_id?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  due_date?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  loading: boolean;
  createTicket: (ticket: Omit<Ticket, 'id' | 'ticket_number' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTicket: (id: string, updates: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  getTicketById: (id: string) => Ticket | undefined;
  refreshTickets: () => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'ticket_number' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([{
          ...ticketData,
          created_by: user?.id,
          status: ticketData.status || 'open'
        }])
        .select()
        .single();

      if (error) throw error;

      setTickets(prev => [data, ...prev]);
      toast.success('Ticket created successfully');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket');
      throw error;
    }
  };

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setTickets(prev => prev.map(ticket => 
        ticket.id === id ? { ...ticket, ...updates } : ticket
      ));
      toast.success('Ticket updated successfully');
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Failed to update ticket');
      throw error;
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTickets(prev => prev.filter(ticket => ticket.id !== id));
      toast.success('Ticket deleted successfully');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket');
      throw error;
    }
  };

  const getTicketById = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  };

  const refreshTickets = async () => {
    await fetchTickets();
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      loading,
      createTicket,
      updateTicket,
      deleteTicket,
      getTicketById,
      refreshTickets
    }}>
      {children}
    </TicketContext.Provider>
  );
};