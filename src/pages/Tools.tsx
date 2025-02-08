
import { Calculator, Activity, Weight, Heart } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BMICalculator from "@/components/calculators/BMICalculator";
import BMRCalculator from "@/components/calculators/BMRCalculator";
import TDEECalculator from "@/components/calculators/TDEECalculator";
import BodyFatCalculator from "@/components/calculators/BodyFatCalculator";

const Tools = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const calculators = [
    {
      id: "bmi",
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index to understand your weight relative to your height.",
      icon: Calculator,
      component: BMICalculator
    },
    {
      id: "bmr",
      title: "BMR Calculator",
      description: "Find your Basal Metabolic Rate to understand your daily caloric needs.",
      icon: Activity,
      component: BMRCalculator
    },
    {
      id: "tdee",
      title: "TDEE Calculator",
      description: "Calculate your Total Daily Energy Expenditure for optimal nutrition planning.",
      icon: Weight,
      component: TDEECalculator
    },
    {
      id: "bodyfat",
      title: "Body Fat Calculator",
      description: "Estimate your body fat percentage using various measurement methods.",
      icon: Heart,
      component: BodyFatCalculator
    }
  ];

  const handleCalculatorSelect = (calculatorId: string) => {
    setActiveCalculator(calculatorId === activeCalculator ? null : calculatorId);
  };

  return (
    <div className="min-h-screen bg-dark pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Fitness <span className="text-primary">Calculators</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Use our precision tools to track your health, set goals, and optimize your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {calculators.map(({ id, title, description, icon: Icon, component: Calculator }) => (
            <Card
              key={id}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-gray-400">{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-primary hover:bg-secondary"
                  onClick={() => handleCalculatorSelect(id)}
                >
                  {activeCalculator === id ? "Hide Calculator" : "Show Calculator"}
                </Button>
                {activeCalculator === id && (
                  <div className="mt-6">
                    <Calculator />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
