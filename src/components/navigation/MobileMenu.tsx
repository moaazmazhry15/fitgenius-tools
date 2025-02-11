
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  session: any;
  profile: {
    username: string | null;
    avatar_url: string | null;
  };
}

const MobileMenu = ({ isOpen, setIsOpen, session, profile }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
          to="/"
          className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/tools"
          className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Tools
        </Link>
        <Link
          to="/resources"
          className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Resources
        </Link>
        {session && (
          <Link
            to="/dashboard"
            className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        )}
        <div className="space-y-2 mt-4">
          {session ? (
            <>
              <div className="px-3 py-2 text-base font-medium text-foreground">
                {profile.username || session.user.email}
              </div>
              <Button
                className="w-full btn-modern bg-red-500 text-white hover:bg-red-600"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full btn-modern border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  navigate('/auth');
                  setIsOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button 
                className="w-full btn-modern bg-primary text-white hover:bg-secondary"
                onClick={() => {
                  navigate('/auth?mode=signup');
                  setIsOpen(false);
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
