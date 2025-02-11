
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnauthenticatedMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        className="btn-modern bg-transparent border-2 border-primary hover:bg-primary/10 text-primary"
        onClick={() => navigate('/auth')}
      >
        Sign In
      </Button>
      <Button 
        className="btn-modern"
        onClick={() => navigate('/auth?mode=signup')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default UnauthenticatedMenu;

