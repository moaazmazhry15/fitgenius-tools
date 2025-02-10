
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Trash2 } from "lucide-react";

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  is_checked: boolean;
}

const categories = [
  "Produce",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Pantry",
  "Frozen",
  "Beverages",
  "Other"
];

const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Produce"
  });

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("grocery_items")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error("Error loading grocery list!");
      console.error("Error:", error.message);
    }
  };

  const addItem = async () => {
    if (!newItem.name.trim()) {
      toast.error("Please enter an item name!");
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No user logged in");

      const { error } = await supabase
        .from("grocery_items")
        .insert([{ 
          ...newItem,
          user_id: session.user.id
        }]);

      if (error) throw error;
      
      toast.success("Item added to grocery list!");
      await fetchItems();
      setNewItem({ name: "", category: "Produce" });
    } catch (error: any) {
      toast.error("Error adding item!");
      console.error("Error:", error.message);
    }
  };

  const toggleItem = async (id: string, isChecked: boolean) => {
    try {
      const { error } = await supabase
        .from("grocery_items")
        .update({ is_checked: isChecked })
        .eq("id", id);

      if (error) throw error;
      await fetchItems();
    } catch (error: any) {
      toast.error("Error updating item!");
      console.error("Error:", error.message);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from("grocery_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Item removed from grocery list!");
      await fetchItems();
    } catch (error: any) {
      toast.error("Error deleting item!");
      console.error("Error:", error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grocery List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Add item..."
              />
            </div>
            <Select
              value={newItem.category}
              onValueChange={(value) => setNewItem({ ...newItem, category: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addItem}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="space-y-4">
            {categories.map((category) => {
              const categoryItems = items.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="font-medium mb-2">{category}</h3>
                  <div className="space-y-2">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 border rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.is_checked}
                            onCheckedChange={(checked) => toggleItem(item.id, checked as boolean)}
                          />
                          <span className={item.is_checked ? "line-through text-muted-foreground" : ""}>
                            {item.name}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroceryList;
