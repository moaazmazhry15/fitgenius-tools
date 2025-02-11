
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthenticatedMenu from "./auth/AuthenticatedMenu";
import UnauthenticatedMenu from "./auth/UnauthenticatedMenu";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

const UserMenu = () => {
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

  if (session) {
    return <AuthenticatedMenu session={session} profile={profile} />;
  }

  return <UnauthenticatedMenu />;
};

export default UserMenu;
