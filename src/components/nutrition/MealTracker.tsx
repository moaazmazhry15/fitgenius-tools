
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import MealForm from "./MealForm";
import MealList, { Meal } from "./MealList";

const MealTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    try {
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .order("meal_date", { ascending: false });

      if (error) throw error;
      setMeals(data || []);
    } catch (error: any) {
      toast.error("Error loading meals!");
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <MealForm onMealAdded={fetchMeals} />
        <div className="mt-6">
          <MealList meals={meals} onMealDeleted={fetchMeals} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MealTracker;
