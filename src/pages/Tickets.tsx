import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail,
  Monitor,
  FileText,
  ArrowRight
} from "lucide-react";

const Tickets = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Illustration and Header */}
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <svg viewBox="0 0 200 150" className="w-full h-full">
                {/* Person illustration */}
                <g>
                  {/* Body */}
                  <path d="M100 90 Q90 85 85 95 L85 120 Q85 125 90 125 L110 125 Q115 125 115 120 L115 95 Q110 85 100 90" 
                        fill="none" stroke="currentColor" strokeWidth="2"/>
                  {/* Head */}
                  <circle cx="100" cy="75" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
                  {/* Hair */}
                  <path d="M88 68 Q100 60 112 68" fill="none" stroke="currentColor" strokeWidth="2"/>
                  {/* Arm pointing to bubble */}
                  <path d="M115 95 Q125 90 135 95" fill="none" stroke="currentColor" strokeWidth="2"/>
                </g>
                
                {/* Chat bubble */}
                <circle cx="150" cy="85" r="25" fill="hsl(var(--primary))" opacity="0.9"/>
                <path d="M135 95 Q140 105 145 95" fill="hsl(var(--primary))" opacity="0.9"/>
                
                {/* Chat icon inside bubble */}
                <g transform="translate(150,85)" fill="white">
                  <rect x="-8" y="-5" width="16" height="8" rx="2"/>
                  <rect x="-6" y="-3" width="12" height="1"/>
                  <rect x="-6" y="-1" width="8" height="1"/>
                  <rect x="-6" y="1" width="10" height="1"/>
                </g>
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Create your first ticket</h1>
          <p className="text-muted-foreground">
            Create tickets in your service desk using the options below
          </p>
        </div>

        {/* Options Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Connect your support email</h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Convert your emails to service desk tickets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Monitor className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Request from self-service portal</h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Raise a request for a service item
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Create tickets manually</h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add using a ticket form
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            or{" "}
            <Button variant="link" className="text-primary p-0 h-auto font-normal text-sm">
              Get started with sample data
            </Button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;