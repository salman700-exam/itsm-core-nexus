import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Package, Shield, Clock, CheckCircle } from "lucide-react";

const Assets = () => {
  const assets = [
    {
      id: "AST-001",
      name: "Dell Laptop - Marketing Dept",
      type: "Hardware",
      status: "In Use",
      location: "Office - Floor 2",
      assignedTo: "John Smith",
      purchaseDate: "2023-06-15",
      warranty: "Active"
    },
    {
      id: "AST-002",
      name: "Microsoft Office 365 - Enterprise",
      type: "Software",
      status: "Active",
      location: "Cloud",
      assignedTo: "IT Department",
      purchaseDate: "2023-01-01",
      warranty: "N/A" 
    },
    {
      id: "AST-003",
      name: "Network Switch - Cisco 2960",
      type: "Network Equipment",
      status: "In Use", 
      location: "Server Room A",
      assignedTo: "Network Team",
      purchaseDate: "2022-12-10",
      warranty: "Expired"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Use": return "default";
      case "Active": return "default";
      case "Available": return "secondary";
      case "Under Maintenance": return "secondary";
      case "Retired": return "destructive";
      default: return "secondary";
    }
  };

  const getWarrantyColor = (warranty: string) => {
    switch (warranty) {
      case "Active": return "default";
      case "Expired": return "destructive";
      case "N/A": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Asset Management</h1>
            <p className="text-muted-foreground">Track and manage organizational assets</p>
          </div>
          <Button onClick={() => window.location.href = '/create-asset'}>
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Package className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Use</CardTitle>
              <CheckCircle className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,089</div>
              <p className="text-xs text-muted-foreground">88% utilization</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Maintenance</CardTitle>
              <Clock className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Avg: 3 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warranty Expiring</CardTitle>
              <Shield className="w-4 h-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Lifecycle */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Lifecycle Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Procurement</h3>
                <p className="text-2xl font-bold">15</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Deployed</h3>
                <p className="text-2xl font-bold">856</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-sm">Maintenance</h3>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">In progress</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-sm">Storage</h3>
                <p className="text-2xl font-bold">122</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold text-sm">Disposal</h3>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">End of life</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assets Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search assets..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="network">Network Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-use">In Use</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Warranty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(asset.status)}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.purchaseDate}</TableCell>
                    <TableCell>
                      <Badge variant={getWarrantyColor(asset.warranty)}>
                        {asset.warranty}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Assets;