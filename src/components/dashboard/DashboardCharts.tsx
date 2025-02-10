
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";

interface DashboardChartsProps {
  userId: string;
}

const DashboardCharts = ({ userId }: DashboardChartsProps) => {
  const [timeRange, setTimeRange] = useState<"7" | "14" | "30">("7");
  const [caloriesData, setCaloriesData] = useState<any[]>([]);
  const [workoutData, setWorkoutData] = useState<any[]>([]);

  const fetchData = async () => {
    const daysAgo = parseInt(timeRange);
    const startDate = format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');

    // Fetch calories data
    const { data: mealsData } = await supabase
      .from('meals')
      .select('meal_date, calories')
      .eq('user_id', userId)
      .gte('meal_date', startDate)
      .order('meal_date', { ascending: true });

    // Group calories by date
    const caloriesByDate = (mealsData || []).reduce((acc: any, meal: any) => {
      const date = meal.meal_date;
      if (!acc[date]) {
        acc[date] = { date, total_calories: 0 };
      }
      acc[date].total_calories += meal.calories;
      return acc;
    }, {});

    setCaloriesData(Object.values(caloriesByDate));

    // Fetch workout data
    const { data: workouts } = await supabase
      .from('workouts')
      .select('workout_date, duration')
      .eq('user_id', userId)
      .gte('workout_date', startDate)
      .order('workout_date', { ascending: true });

    // Group workout duration by date
    const workoutsByDate = (workouts || []).reduce((acc: any, workout: any) => {
      const date = workout.workout_date;
      if (!acc[date]) {
        acc[date] = { date, total_duration: 0 };
      }
      acc[date].total_duration += workout.duration;
      return acc;
    }, {});

    setWorkoutData(Object.values(workoutsByDate));
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, userId]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Calories Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Calorie Intake</CardTitle>
          <Select
            value={timeRange}
            onValueChange={(value: "7" | "14" | "30") => setTimeRange(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={caloriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => format(new Date(value), 'MMM dd')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                formatter={(value: number) => [`${value} calories`, "Calories"]}
              />
              <Line 
                type="monotone" 
                dataKey="total_calories" 
                stroke="#9b87f5" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Workout Duration Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Workout Duration</CardTitle>
          <Select
            value={timeRange}
            onValueChange={(value: "7" | "14" | "30") => setTimeRange(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => format(new Date(value), 'MMM dd')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                formatter={(value: number) => [`${value} minutes`, "Duration"]}
              />
              <Bar 
                dataKey="total_duration" 
                fill="#7E69AB" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
