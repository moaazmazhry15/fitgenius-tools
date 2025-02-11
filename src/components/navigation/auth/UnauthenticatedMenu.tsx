
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnauthenticatedMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        className="btn-modern border-primary text-primary hover:bg-primary hover:text-white"
        onClick={() => navigate('/auth')}
      >
        Sign In
      </Button>
      <Button 
        className="btn-modern bg-primary text-white hover:bg-secondary"
        onClick={() => navigate('/auth?mode=signup')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default UnauthenticatedMenu;
