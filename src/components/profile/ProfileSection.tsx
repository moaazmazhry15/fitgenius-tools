
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

const ProfileSection = ({ userEmail }: { userEmail: string }) => {
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatar_url: null,
  });

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

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error("Error updating the data!");
      console.error("Error:", error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
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
              value={userEmail}
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

          <div className="flex justify-end">
            <Button type="submit" disabled={updating}>
              {updating ? "Saving..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
