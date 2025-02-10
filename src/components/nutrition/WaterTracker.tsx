
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Droplets, Plus, Minus, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface WaterIntake {
  id: string;
  intake_date: string;
  amount_ml: number;
}

const WaterTracker = () => {
  const [waterIntakes, setWaterIntakes] = useState<WaterIntake[]>([]);
  const [amount, setAmount] = useState(250); // Default to 250ml

  const fetchWaterIntakes = async () => {
    try {
      const { data, error } = await supabase
        .from("water_intake")
        .select("*")
        .order("intake_date", { ascending: false });

      if (error) throw error;
      setWaterIntakes(data || []);
    } catch (error: any) {
      toast.error("Error loading water intake!");
      console.error("Error:", error.message);
    }
  };

  const addWaterIntake = async () => {
    try {
      const { error } = await supabase
        .from("water_intake")
        .insert([{
          amount_ml: amount,
          intake_date: format(new Date(), 'yyyy-MM-dd')
        }]);

      if (error) throw error;
      
      toast.success("Water intake added!");
      await fetchWaterIntakes();
    } catch (error: any) {
      toast.error("Error adding water intake!");
      console.error("Error:", error.message);
    }
  };

  const deleteWaterIntake = async (id: string) => {
    try {
      const { error } = await supabase
        .from("water_intake")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Water intake deleted!");
      await fetchWaterIntakes();
    } catch (error: any) {
      toast.error("Error deleting water intake!");
      console.error("Error:", error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAmount(Math.max(0, amount - 50))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAmount(amount + 50)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">ml</span>
            <Button onClick={addWaterIntake}>
              <Droplets className="mr-2 h-4 w-4" />
              Add Water
            </Button>
          </div>

          <div className="space-y-4">
            {waterIntakes.map((intake) => (
              <div
                key={intake.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{intake.amount_ml}ml</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(intake.intake_date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteWaterIntake(intake.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
