import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background cyberpunk-grid flex items-center justify-center relative">
      <div className="text-center space-y-8 p-8">
        {/* Logo placeholder - you can add actual logo later */}
        <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center border border-primary/50 hologram">
          <span className="text-primary text-4xl font-bold">CSI</span>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary glitch-text animate-float" data-text="CSI">
            CSI
          </h1>
          <h2 className="text-2xl text-foreground">
            Computer Society of India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter the digital arena and test your computing knowledge in this cyberpunk quiz challenge
          </p>
        </div>
        
        {/* Get Started Button */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-primary hover:bg-primary/80 text-primary-foreground px-12 py-6 text-xl font-bold neon-glow hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 animate-pulse-neon"
        >
          Get Started
        </Button>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-secondary/30 rotate-45 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-accent/30 rotate-12 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
};

export default LandingPage;