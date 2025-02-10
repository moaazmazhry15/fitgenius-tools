
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface Meal {
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

interface MealListProps {
  meals: Meal[];
  onMealDeleted: () => void;
}

const MealList = ({ meals, onMealDeleted }: MealListProps) => {
  const deleteMeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from("meals")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Meal deleted successfully!");
      onMealDeleted();
    } catch (error: any) {
      toast.error("Error deleting meal!");
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="space-y-4">
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
  );
};

export default MealList;
