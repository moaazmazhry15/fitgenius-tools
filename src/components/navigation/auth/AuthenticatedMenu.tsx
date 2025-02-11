
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

interface AuthenticatedMenuProps {
  session: any;
  profile: Profile;
}

const AuthenticatedMenu = ({ session, profile }: AuthenticatedMenuProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Link 
        to="/dashboard" 
        className="text-foreground hover:text-primary transition-colors"
      >
        Dashboard
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={profile.avatar_url || undefined} alt={profile.username || "User"} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard')}
          >
            {profile.username || session.user.email}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-500 focus:text-red-500" 
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthenticatedMenu;
