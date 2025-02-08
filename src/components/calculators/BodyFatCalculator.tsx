
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateBodyFat } from "@/utils/calculators";
import CalculatorLayout from "./CalculatorLayout";
import { useToast } from "@/components/ui/use-toast";

const BodyFatCalculator = () => {
  const [waist, setWaist] = useState<string>("");
  const [neck, setNeck] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    try {
      const waistNum = parseFloat(waist);
      const neckNum = parseFloat(neck);
      const heightNum = parseFloat(height);
      const hipNum = gender === "female" ? parseFloat(hip) : undefined;

      if (!waistNum || !neckNum || !heightNum || (gender === "female" && !hipNum)) {
        toast({
          title: "Error",
          description: "Please enter valid values for all required fields",
          variant: "destructive",
        });
        return;
      }

      const bodyFat = calculateBodyFat(waistNum, neckNum, heightNum, gender, hipNum);
      setResult(bodyFat);
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
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using the U.S. Navy method."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="waist">Waist (cm)</Label>
            <Input
              id="waist"
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Enter waist circumference"
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="neck">Neck (cm)</Label>
            <Input
              id="neck"
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              placeholder="Enter neck circumference"
              className="bg-white/5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {gender === "female" && (
          <div className="space-y-2">
            <Label htmlFor="hip">Hip (cm)</Label>
            <Input
              id="hip"
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="Enter hip circumference"
              className="bg-white/5"
            />
          </div>
        )}

        <Button onClick={handleCalculate} className="w-full btn-modern">
          Calculate Body Fat
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 text-center">
            <p className="text-2xl font-bold text-primary mb-2">{result}%</p>
            <p className="text-gray-400">
              Your estimated body fat percentage is <span className="text-white">{result}%</span>
            </p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;

