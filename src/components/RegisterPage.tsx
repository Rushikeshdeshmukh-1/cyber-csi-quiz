import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface RegisterPageProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string; branch: string }) => void;
}

const RegisterPage = ({ onSubmit }: RegisterPageProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    branch: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.branch) {
      toast({
        title: "Access Denied",
        description: "All fields are required to enter the quiz arena",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.email.includes("@")) {
      toast({
        title: "Invalid Credentials",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background cyberpunk-grid flex items-center justify-center relative p-4">
      <div className="w-full max-w-md">
        <div className="hologram rounded-lg p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary glitch-text" data-text="Register for the Quiz">
              Register for the Quiz
            </h1>
            <p className="text-muted-foreground">Enter your credentials to access the quiz arena</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground font-mono">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="bg-input/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary neon-glow"
                  placeholder="Enter first name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground font-mono">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="bg-input/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary neon-glow"
                  placeholder="Enter last name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-mono">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-input/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary neon-glow"
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branch" className="text-foreground font-mono">Branch</Label>
                <Select value={formData.branch} onValueChange={(value) => handleChange("branch", value)}>
                  <SelectTrigger className="bg-input/50 border-primary/30 text-foreground focus:border-primary focus:ring-primary neon-glow">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-primary/30">
                    <SelectItem value="computer-engineering">Computer Engineering</SelectItem>
                    <SelectItem value="information-technology">Information Technology</SelectItem>
                    <SelectItem value="electronics-engineering">Electronics Engineering</SelectItem>
                    <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil-engineering">Civil Engineering</SelectItem>
                    <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold neon-glow hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Enter Quiz Arena
            </Button>
          </form>
        </div>
      </div>
      
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-primary/20" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-secondary/20" />
        <div className="absolute left-1/4 top-0 w-px h-full bg-primary/20" />
        <div className="absolute right-1/4 top-0 w-px h-full bg-accent/20" />
      </div>
    </div>
  );
};

export default RegisterPage;