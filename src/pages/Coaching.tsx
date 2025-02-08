
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Dumbbell, Heart, Trophy } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Coaching = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "99",
      features: [
        "Personalized workout plan",
        "Monthly check-ins",
        "Email support",
        "Access to exercise library",
        "Nutrition guidelines"
      ]
    },
    {
      name: "Premium Plan",
      price: "199",
      features: [
        "All Basic Plan features",
        "Weekly check-ins",
        "24/7 chat support",
        "Custom meal plans",
        "Progress tracking",
        "Video form checks"
      ]
    },
    {
      name: "Elite Plan",
      price: "299",
      features: [
        "All Premium Plan features",
        "Daily check-ins",
        "1-on-1 video calls",
        "Priority support",
        "Advanced analytics",
        "Supplement guidance"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Transform Your Life with
            <span className="text-primary"> Expert Coaching</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Get personalized guidance from certified fitness professionals to achieve your goals faster and more effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center p-6 glass-card">
              <Dumbbell className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-muted-foreground text-center">Certified professionals with years of experience</p>
            </div>
            <div className="flex flex-col items-center p-6 glass-card">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
              <p className="text-muted-foreground text-center">Custom programs tailored to your goals</p>
            </div>
            <div className="flex flex-col items-center p-6 glass-card">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-muted-foreground text-center">Hundreds of success stories and transformations</p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Pricing Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground">Select the perfect coaching package for your fitness journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className="glass-card hover:border-primary/50 transition-colors">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-8">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="text-primary" size={20} />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary hover:bg-secondary">Get Started</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;
