
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MealFormProps {
  onMealAdded: () => void;
}

export interface NewMeal {
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

const MealForm = ({ onMealAdded }: MealFormProps) => {
  const [newMeal, setNewMeal] = useState<NewMeal>({
    meal_date: format(new Date(), 'yyyy-MM-dd'),
    meal_type: "breakfast",
    name: "",
    calories: 0,
    protein_grams: 0,
    carbs_grams: 0,
    fat_grams: 0,
    notes: null,
  });

  const addMeal = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No user logged in");

      const { error } = await supabase
        .from("meals")
        .insert([{ 
          ...newMeal,
          user_id: session.user.id
        }]);

      if (error) throw error;
      
      toast.success("Meal added successfully!");
      onMealAdded();
      
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

  return (
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
  );
};

export default MealForm;
