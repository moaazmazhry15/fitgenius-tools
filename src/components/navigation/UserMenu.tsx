
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

const UserMenu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatar_url: null,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        getProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        getProfile(session.user.id);
      } else {
        setProfile({ username: null, avatar_url: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error: any) {
      console.error("Error loading user data:", error.message);
    }
  };

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

  if (session) {
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
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.username || "User"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
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
  }

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

export default UserMenu;
