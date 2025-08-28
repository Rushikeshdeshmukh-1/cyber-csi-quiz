import { useEffect, useState } from "react";

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage = ({ onComplete }: LoadingPageProps) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textTimer = setTimeout(() => setShowText(true), 1000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(textTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background cyberpunk-grid flex items-center justify-center relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
      </div>
      
      <div className="text-center z-10">
        {/* Logo */}
        <div className="mb-8">
          <h1 
            className={`text-8xl font-bold text-primary glitch-text ${showText ? 'animate-glitch' : ''}`}
            data-text="CSI"
          >
            CSI
          </h1>
        </div>
        
        {/* Boot sequence text */}
        {showText && (
          <div className="space-y-2 text-sm text-muted-foreground font-mono">
            <div className="animate-pulse">INITIALIZING QUANTUM INTERFACE...</div>
            <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>LOADING NEURAL NETWORKS...</div>
            <div className="animate-pulse" style={{ animationDelay: "1s" }}>ESTABLISHING SECURE CONNECTION...</div>
          </div>
        )}
        
        {/* Progress bar */}
        <div className="mt-8 w-80 mx-auto">
          <div className="bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-primary neon-glow transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-primary text-sm mt-2 font-mono">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;