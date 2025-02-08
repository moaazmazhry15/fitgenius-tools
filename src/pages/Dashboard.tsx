
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

interface Workout {
  id: string;
  workout_date: string;
  workout_type: string;
  duration: number;
  calories_burned: number | null;
  notes: string | null;
}

const workoutTypes = [
  "Strength Training",
  "Cardio",
  "HIIT",
  "Yoga",
  "Running",
  "Swimming",
  "Cycling",
  "Other"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatar_url: null,
  });
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'id'>>({
    workout_date: format(new Date(), 'yyyy-MM-dd'),
    workout_type: "Strength Training",
    duration: 30,
    calories_burned: null,
    notes: null,
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserEmail(session.user.email || "");
      await Promise.all([getProfile(), fetchWorkouts()]);
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

  const fetchWorkouts = async () => {
    try {
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .order("workout_date", { ascending: false });

      if (error) throw error;
      setWorkouts(data || []);
    } catch (error: any) {
      toast.error("Error loading workouts!");
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

  const addWorkout = async () => {
    try {
      const { error } = await supabase
        .from("workouts")
        .insert([newWorkout]);

      if (error) throw error;
      
      toast.success("Workout added successfully!");
      await fetchWorkouts();
      
      // Reset form
      setNewWorkout({
        workout_date: format(new Date(), 'yyyy-MM-dd'),
        workout_type: "Strength Training",
        duration: 30,
        calories_burned: null,
        notes: null,
      });
    } catch (error: any) {
      toast.error("Error adding workout!");
      console.error("Error:", error.message);
    }
  };

  const deleteWorkout = async (id: string) => {
    try {
      const { error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Workout deleted successfully!");
      await fetchWorkouts();
    } catch (error: any) {
      toast.error("Error deleting workout!");
      console.error("Error:", error.message);
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Section */}
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

        {/* Add Workout Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newWorkout.workout_date}
                  onChange={(e) => setNewWorkout({ ...newWorkout, workout_date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Workout Type</label>
                <Select
                  value={newWorkout.workout_type}
                  onValueChange={(value) => setNewWorkout({ ...newWorkout, workout_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input
                  type="number"
                  value={newWorkout.duration}
                  onChange={(e) => setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Calories Burned</label>
                <Input
                  type="number"
                  value={newWorkout.calories_burned || ""}
                  onChange={(e) => setNewWorkout({ ...newWorkout, calories_burned: e.target.value ? parseInt(e.target.value) : null })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={newWorkout.notes || ""}
                  onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                  placeholder="Add any notes about your workout..."
                />
              </div>

              <Button
                onClick={addWorkout}
                className="w-full"
              >
                <PlusCircle className="mr-2" />
                Add Workout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workout History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workouts.length === 0 ? (
              <p className="text-center text-muted-foreground">No workouts recorded yet.</p>
            ) : (
              workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{workout.workout_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(workout.workout_date), 'MMM dd, yyyy')} • {workout.duration} minutes
                    </p>
                    {workout.calories_burned && (
                      <p className="text-sm text-muted-foreground">
                        Calories: {workout.calories_burned}
                      </p>
                    )}
                    {workout.notes && (
                      <p className="text-sm mt-2">{workout.notes}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteWorkout(workout.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
