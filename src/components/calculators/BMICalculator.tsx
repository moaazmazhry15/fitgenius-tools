
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateBMI } from "@/utils/calculators";
import CalculatorLayout from "./CalculatorLayout";
import { useToast } from "@/components/ui/use-toast";

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    try {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);

      if (!weightNum || !heightNum) {
        toast({
          title: "Error",
          description: "Please enter valid weight and height values",
          variant: "destructive",
        });
        return;
      }

      const bmi = calculateBMI(weightNum, heightNum);
      setResult(bmi);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to assess your weight relative to your height."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="bg-white/5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (m)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in meters"
            className="bg-white/5"
          />
        </div>
      </div>

      <Button onClick={handleCalculate} className="w-full btn-modern">
        Calculate BMI
      </Button>

      {result !== null && (
        <div className="mt-6 p-4 rounded-lg bg-white/5 text-center">
          <p className="text-2xl font-bold text-primary mb-2">{result}</p>
          <p className="text-gray-400">
            Category: <span className="text-white">{getBMICategory(result)}</span>
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default BMICalculator;

