import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Paperclip, Calendar } from "lucide-react";
import { useTickets } from "@/contexts/TicketContext";
import { useCustomers } from "@/contexts/CustomerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateTicket = () => {
  const form = useForm();
  const { createTicket } = useTickets();
  const { customers } = useCustomers();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await createTicket({
        title: data.shortDescription || data.description?.substring(0, 50) || 'New Ticket',
        description: data.description,
        priority: data.priority || 'medium',
        status: 'open',
        customer_id: data.requester,
        due_date: data.dueDate || null,
        assigned_to: data.assignedTo || null
      });
      
      toast.success('Ticket created successfully!');
      navigate('/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Incident</h1>
          <p className="text-muted-foreground">Fill out the form below to create a new incident ticket</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="requester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requester</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                  {customer.name} - {customer.company}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hardware">Hardware</SelectItem>
                              <SelectItem value="software">Software</SelectItem>
                              <SelectItem value="network">Network</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="impact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select impact" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="assignmentGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignment Group</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignment group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="it-support">IT Support</SelectItem>
                              <SelectItem value="network-team">Network Team</SelectItem>
                              <SelectItem value="security">Security Team</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assignedTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned To</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tech1">Tech Support 1</SelectItem>
                              <SelectItem value="tech2">Tech Support 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="office-1">Main Office</SelectItem>
                              <SelectItem value="office-2">Branch Office</SelectItem>
                              <SelectItem value="remote">Remote</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="configurationItem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Configuration Item</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select CI" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="server-1">Server 1</SelectItem>
                              <SelectItem value="workstation">Workstation</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a brief description of the issue" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide detailed information about the issue"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="businessService"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Service</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email Service</SelectItem>
                              <SelectItem value="crm">CRM System</SelectItem>
                              <SelectItem value="erp">ERP System</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" {...field} />
                            <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Paperclip className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Ticket
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateTicket;