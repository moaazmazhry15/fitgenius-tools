
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavLinks from "../navigation/NavLinks";
import UserMenu from "../navigation/UserMenu";
import MobileMenu from "../navigation/MobileMenu";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              FitCalcs
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <UserMenu />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          session={session}
          profile={profile}
        />
      </div>
    </nav>
  );
};

export default Navbar;
