
import { Calculator, Activity, Weight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Our <span className="text-primary">Fitness Tools</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our comprehensive suite of fitness calculators designed to help you track, measure, and achieve your health and fitness goals with precision and ease.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {FEATURES.map(({ icon: Icon, title, description, path }) => (
            <Link key={title} to={path} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
              <FeatureCard
                icon={Icon}
                title={title}
                description={description}
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/tools">
            <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg rounded-full btn-modern hover:scale-105 transform duration-300">
              Explore All Calculators <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const FEATURES = [
  {
    icon: Calculator,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index instantly",
    path: "/calculators/bmi"
  },
  {
    icon: Activity,
    title: "BMR Calculator",
    description: "Find your Basal Metabolic Rate",
    path: "/calculators/bmr"
  },
  {
    icon: Weight,
    title: "TDEE Calculator",
    description: "Total Daily Energy Expenditure",
    path: "/calculators/tdee"
  },
  {
    icon: Heart,
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage",
    path: "/calculators/bodyfat"
  }
];

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <Card className="p-6 rounded-xl bg-card border border-border hover:bg-accent/5 transition-colors cursor-pointer hover:scale-105 transform duration-[3000ms]">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

export default FeaturesSection;
