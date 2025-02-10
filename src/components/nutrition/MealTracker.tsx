
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Meal {
  id: string;
  meal_date: string;
  meal_type: string;
  name: string;
  calories: number;
  protein_grams: number;
  carbs_grams: number;
  fat_grams: number;
  notes: string | null;
}

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

const MealTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState<Omit<Meal, 'id'>>({
    meal_date: format(new Date(), 'yyyy-MM-dd'),
    meal_type: "breakfast",
    name: "",
    calories: 0,
    protein_grams: 0,
    carbs_grams: 0,
    fat_grams: 0,
    notes: null,
  });

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

  const addMeal = async () => {
    try {
      const { error } = await supabase
        .from("meals")
        .insert([newMeal]);

      if (error) throw error;
      
      toast.success("Meal added successfully!");
      await fetchMeals();
      
      // Reset form
      setNewMeal({
        meal_date: format(new Date(), 'yyyy-MM-dd'),
        meal_type: "breakfast",
        name: "",
        calories: 0,
        protein_grams: 0,
        carbs_grams: 0,
        fat_grams: 0,
        notes: null,
      });
    } catch (error: any) {
      toast.error("Error adding meal!");
      console.error("Error:", error.message);
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from("meals")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Meal deleted successfully!");
      await fetchMeals();
    } catch (error: any) {
      toast.error("Error deleting meal!");
      console.error("Error:", error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={newMeal.meal_date}
                onChange={(e) => setNewMeal({ ...newMeal, meal_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Meal Type</label>
              <Select
                value={newMeal.meal_type}
                onValueChange={(value) => setNewMeal({ ...newMeal, meal_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Name</label>
            <Input
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              placeholder="Enter meal name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Calories</label>
              <Input
                type="number"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Protein (g)</label>
              <Input
                type="number"
                value={newMeal.protein_grams}
                onChange={(e) => setNewMeal({ ...newMeal, protein_grams: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Carbs (g)</label>
              <Input
                type="number"
                value={newMeal.carbs_grams}
                onChange={(e) => setNewMeal({ ...newMeal, carbs_grams: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fat (g)</label>
              <Input
                type="number"
                value={newMeal.fat_grams}
                onChange={(e) => setNewMeal({ ...newMeal, fat_grams: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={newMeal.notes || ""}
              onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
              placeholder="Add any notes about your meal..."
            />
          </div>

          <Button onClick={addMeal} className="w-full">
            <PlusCircle className="mr-2" />
            Add Meal
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{meal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(meal.meal_date), 'MMM dd, yyyy')} • {meal.meal_type}
                </p>
                <p className="text-sm">
                  Calories: {meal.calories} • Protein: {meal.protein_grams}g • 
                  Carbs: {meal.carbs_grams}g • Fat: {meal.fat_grams}g
                </p>
                {meal.notes && (
                  <p className="text-sm mt-2">{meal.notes}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMeal(meal.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MealTracker;
