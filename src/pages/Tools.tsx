
import { Calculator, Activity, Weight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Tools = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "bmi",
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index to understand your weight relative to your height.",
      icon: Calculator,
      path: "/calculators/bmi"
    },
    {
      id: "bmr",
      title: "BMR Calculator",
      description: "Find your Basal Metabolic Rate to understand your daily caloric needs.",
      icon: Activity,
      path: "/calculators/bmr"
    },
    {
      id: "tdee",
      title: "TDEE Calculator",
      description: "Calculate your Total Daily Energy Expenditure for optimal nutrition planning.",
      icon: Weight,
      path: "/calculators/tdee"
    },
    {
      id: "bodyfat",
      title: "Body Fat Calculator",
      description: "Estimate your body fat percentage using various measurement methods.",
      icon: Heart,
      path: "/calculators/bodyfat"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Fitness <span className="text-primary">Calculators</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our precision tools to track your health, set goals, and optimize your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {calculators.map(({ id, title, description, icon: Icon, path }) => (
            <Card
              key={id}
              className="bg-card border-border hover:bg-accent/5 transition-colors cursor-pointer hover:scale-105 transform duration-200"
              onClick={() => navigate(path)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{title}</CardTitle>
                <CardDescription className="text-muted-foreground">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
