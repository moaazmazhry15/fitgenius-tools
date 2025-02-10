
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  gender: string | null;
  date_of_birth: string | null;
}

const ProfileSection = ({ userEmail }: { userEmail: string }) => {
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatar_url: null,
    full_name: null,
    bio: null,
    location: null,
    website: null,
    gender: null,
    date_of_birth: null,
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
        full_name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        gender: profile.gender,
        date_of_birth: profile.date_of_birth,
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
            <label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full_name"
              type="text"
              value={profile.full_name || ""}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              placeholder="Enter your full name"
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
              placeholder="Choose a username"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell us about yourself"
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              type="text"
              value={profile.location || ""}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Your location"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-medium">
              Website
            </label>
            <Input
              id="website"
              type="url"
              value={profile.website || ""}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              placeholder="Your website URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender
            </label>
            <Select
              value={profile.gender || ""}
              onValueChange={(value) => setProfile({ ...profile, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="date_of_birth" className="text-sm font-medium">
              Date of Birth
            </label>
            <Input
              id="date_of_birth"
              type="date"
              value={profile.date_of_birth || ""}
              onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
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
              placeholder="URL to your avatar image"
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
