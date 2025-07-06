import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Monitoring from "./pages/Monitoring";
import Tickets from "./pages/Tickets";
import Customers from "./pages/Customers";
import CreateTicket from "./pages/CreateTicket";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Problems from "./pages/Problems";
import Changes from "./pages/Changes";
import Knowledge from "./pages/Knowledge";
import Assets from "./pages/Assets";
import Operations from "./pages/Operations";
import SaaS from "./pages/SaaS";
import Projects from "./pages/Projects";
import Portfolio from "./pages/Portfolio";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import Users from "./pages/Users";
import Security from "./pages/Security";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/changes" element={<Changes />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/saas" element={<SaaS />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/users" element={<Users />} />
          <Route path="/security" element={<Security />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/create-change" element={<CreateTicket />} />
          <Route path="/create-purchase-order" element={<CreateTicket />} />
          <Route path="/create-major-incident" element={<CreateTicket />} />
          <Route path="/create-release" element={<CreateTicket />} />
          <Route path="/create-project" element={<CreateTicket />} />
          <Route path="/create-request" element={<CreateTicket />} />
          <Route path="/create-asset" element={<CreateTicket />} />
          <Route path="/create-offboarding-request" element={<CreateTicket />} />
          <Route path="/create-problem" element={<CreateTicket />} />
          <Route path="/create-contract" element={<CreateTicket />} />
          <Route path="/create-journey-request" element={<CreateTicket />} />
          <Route path="/create-agents" element={<CreateTicket />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
