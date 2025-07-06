import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, BookOpen, ThumbsUp, Eye, Clock } from "lucide-react";

const Knowledge = () => {
  const articles = [
    {
      id: "KB-001",
      title: "How to Reset Your Password",
      category: "Account Management",
      author: "Sarah Johnson",
      views: 1234,
      likes: 89,
      lastUpdated: "2024-01-15",
      status: "published",
      helpfulness: "95%"
    },
    {
      id: "KB-002",
      title: "Setting Up VPN Connection",
      category: "Network Access",
      author: "Mike Davis",
      views: 892,
      likes: 67,
      lastUpdated: "2024-01-12",
      status: "published",
      helpfulness: "92%"
    },
    {
      id: "KB-003",
      title: "Email Configuration Guide",
      category: "Email & Communication",
      author: "Alice Wilson",
      views: 756,
      likes: 54,
      lastUpdated: "2024-01-10",
      status: "draft",
      helpfulness: "88%"
    }
  ];

  const categories = [
    {
      name: "Account Management",
      articles: 24,
      icon: "👤",
      color: "bg-blue-100"
    },
    {
      name: "Network Access",
      articles: 18,
      icon: "🌐", 
      color: "bg-green-100"
    },
    {
      name: "Email & Communication",
      articles: 16,
      icon: "📧",
      color: "bg-purple-100"
    },
    {
      name: "Hardware & Software",
      articles: 32,
      icon: "💻",
      color: "bg-orange-100"
    },
    {
      name: "Security",
      articles: 12,
      icon: "🔒",
      color: "bg-red-100"
    },
    {
      name: "Mobile & Remote",
      articles: 9,
      icon: "📱",
      color: "bg-yellow-100"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "archived": return "secondary";
      case "under-review": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Knowledge Base</h1>
            <p className="text-muted-foreground">Self-service resources and documentation</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Article
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">111</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5K</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Helpfulness</CardTitle>
              <ThumbsUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">User rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Search Success</CardTitle>
              <Search className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Find relevant content</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search knowledge base articles..." 
                className="pl-12 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-lg`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex-1">
                  <h3 className="font-semibold">How to Reset Your Password</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step guide to reset your account password</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      1,234 views
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      95% helpful
                    </span>
                  </div>
                </div>
                <Badge variant="outline">Account</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex-1">
                  <h3 className="font-semibold">Setting Up VPN Connection</h3>
                  <p className="text-sm text-muted-foreground">Connect to company network remotely</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      892 views
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      92% helpful
                    </span>
                  </div>
                </div>
                <Badge variant="outline">Network</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex-1">
                  <h3 className="font-semibold">Email Configuration Guide</h3>
                  <p className="text-sm text-muted-foreground">Set up email on mobile and desktop devices</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      756 views
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      88% helpful
                    </span>
                  </div>
                </div>
                <Badge variant="outline">Email</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Management */}
        <Card>
          <CardHeader>
            <CardTitle>Article Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="account">Account Management</SelectItem>
                  <SelectItem value="network">Network Access</SelectItem>
                  <SelectItem value="email">Email & Communication</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">{article.id} • By {article.author}</p>
                    </div>
                    <Badge variant={getStatusColor(article.status)}>{article.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{article.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Views</p>
                      <p className="font-medium flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Likes</p>
                      <p className="font-medium flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {article.likes}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Helpfulness</p>
                      <p className="font-medium">{article.helpfulness}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.lastUpdated}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Analytics</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Knowledge;