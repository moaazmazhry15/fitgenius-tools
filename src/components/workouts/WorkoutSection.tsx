
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Workout {
  id: string;
  user_id: string;
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

const WorkoutSection = ({ userId }: { userId: string }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'id'>>({
    user_id: userId,
    workout_date: format(new Date(), 'yyyy-MM-dd'),
    workout_type: "Strength Training",
    duration: 30,
    calories_burned: null,
    notes: null,
  });

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

  const addWorkout = async () => {
    try {
      const { error } = await supabase
        .from("workouts")
        .insert([newWorkout]);

      if (error) throw error;
      
      toast.success("Workout added successfully!");
      await fetchWorkouts();
      
      setNewWorkout({
        user_id: userId,
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

  return (
    <>
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

            <Button onClick={addWorkout} className="w-full">
              <PlusCircle className="mr-2" />
              Add Workout
            </Button>
          </div>
        </CardContent>
      </Card>

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
    </>
  );
};

export default WorkoutSection;
