
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/layout/Footer";

interface WorkoutTask {
  id: string;
  date: Date;
  title: string;
  description: string;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workoutTasks, setWorkoutTasks] = useState<WorkoutTask[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setIsDialogOpen(true);
    }
  };

  const handleAddTask = () => {
    if (!date || !newTask.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const task: WorkoutTask = {
      id: crypto.randomUUID(),
      date: date,
      title: newTask.title,
      description: newTask.description,
    };

    setWorkoutTasks([...workoutTasks, task]);
    setNewTask({ title: "", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Workout task added successfully",
    });
  };

  const todaysTasks = workoutTasks.filter(
    (task) => format(task.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">Workout Calendar</h1>
            <p className="text-lg text-muted-foreground">
              {format(new Date(), "EEEE, MMMM do, yyyy")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="glass-card">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>

            <div className="glass-card">
              <h2 className="text-2xl font-semibold mb-4">Today's Workouts</h2>
              {todaysTasks.length === 0 ? (
                <p className="text-muted-foreground">No workouts scheduled for today</p>
              ) : (
                <div className="space-y-4">
                  {todaysTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-lg border border-border bg-card"
                    >
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-muted-foreground">{task.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Workout for {date ? format(date, "MMMM do, yyyy") : ""}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Workout Title
              </label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter workout title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter workout description"
              />
            </div>
            <Button onClick={handleAddTask} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Workout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
