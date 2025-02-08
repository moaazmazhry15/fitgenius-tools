
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateBMR } from "@/utils/calculators";
import CalculatorLayout from "./CalculatorLayout";
import { useToast } from "@/components/ui/use-toast";

const BMRCalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!weightNum || !heightNum || !ageNum) {
      toast({
        title: "Error",
        description: "Please enter valid values for all fields",
        variant: "destructive",
      });
      return;
    }

    const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
    setResult(bmr);
  };

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) to understand your daily caloric needs at rest."
    >
      <div className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={(value) => setGender(value as "male" | "female")}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full btn-modern">
          Calculate BMR
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 text-center">
            <p className="text-2xl font-bold text-primary mb-2">{result}</p>
            <p className="text-gray-400">
              Your Basal Metabolic Rate is <span className="text-white">{result}</span> calories per day
            </p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BMRCalculator;
