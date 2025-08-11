import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            AI Hackathon Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Track your hackathon journey, manage team collaborations, and showcase your innovations
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg shadow-lg shadow-glow transition-all duration-300 hover:shadow-xl hover:shadow-glow"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;