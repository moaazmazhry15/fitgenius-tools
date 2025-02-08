
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatar_url: null,
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      await getProfile();
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const getProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error: any) {
      toast.error("Error loading user data!");
      console.error("Error:", error.message);
    }
  };

  const updateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setUpdating(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No user logged in");

      const updates = {
        id: session.user.id,
        username: profile.username,
        avatar_url: profile.avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error("Error updating the data!");
      console.error("Error:", error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="text"
                value={supabase.auth.getSession().then(({ data: { session } }) => session?.user?.email)}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={profile.username || ""}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="avatar" className="text-sm font-medium">
                Avatar URL
              </label>
              <Input
                id="avatar"
                type="url"
                value={profile.avatar_url || ""}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                disabled={updating}
              >
                {updating ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
