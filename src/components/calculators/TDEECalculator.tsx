
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateBMR, calculateTDEE } from "@/utils/calculators";
import CalculatorLayout from "./CalculatorLayout";
import { useToast } from "@/components/ui/use-toast";

const TDEECalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    try {
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
      const tdee = calculateTDEE(bmr, activityLevel);
      setResult(tdee);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <CalculatorLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure (TDEE) based on your activity level."
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

        <div className="space-y-2">
          <Label>Activity Level</Label>
          <Select value={activityLevel} onValueChange={setActivityLevel}>
            <SelectTrigger className="bg-white/5">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="light">Light (exercise 1-3 times/week)</SelectItem>
              <SelectItem value="moderate">Moderate (exercise 4-5 times/week)</SelectItem>
              <SelectItem value="active">Active (daily exercise or intense 3-4 times/week)</SelectItem>
              <SelectItem value="veryActive">Very Active (intense exercise 6-7 times/week)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calculate TDEE
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 text-center">
            <p className="text-2xl font-bold text-primary mb-2">{result}</p>
            <p className="text-gray-400">
              Your Total Daily Energy Expenditure is <span className="text-white">{result}</span> calories per day
            </p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default TDEECalculator;

