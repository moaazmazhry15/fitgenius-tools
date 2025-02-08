
import { Calculator, Activity, Weight, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Tools = () => {
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
          <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>BMI Calculator</CardTitle>
              <CardDescription className="text-gray-400">
                Calculate your Body Mass Index to understand your weight relative to your height.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-secondary">
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>BMR Calculator</CardTitle>
              <CardDescription className="text-gray-400">
                Find your Basal Metabolic Rate to understand your daily caloric needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-secondary">
                Calculate BMR
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Weight className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>TDEE Calculator</CardTitle>
              <CardDescription className="text-gray-400">
                Calculate your Total Daily Energy Expenditure for optimal nutrition planning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-secondary">
                Calculate TDEE
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Body Fat Calculator</CardTitle>
              <CardDescription className="text-gray-400">
                Estimate your body fat percentage using various measurement methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary hover:bg-secondary">
                Calculate Body Fat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tools;
