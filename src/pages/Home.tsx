
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Heart, Activity, Weight, Building, Users, Trophy, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScheduleMeetingForm from "@/components/forms/ScheduleMeetingForm";
import { useState } from "react";

const Home = () => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6">
              Optimize Your Fitness with
              <span className="text-primary"> Smart Calculators!</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track your health, set goals, and train smarter with FitCalcs.
              Our precision tools help you achieve your fitness goals faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/tools">
                <Button className="w-full sm:w-auto px-6 py-5 text-base sm:text-lg rounded-md font-bold">
                  Try Free Calculators <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto px-6 py-5 text-base sm:text-lg rounded-md font-bold"
                onClick={() => setShowScheduleForm(true)}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ScheduleMeetingForm 
        open={showScheduleForm} 
        onOpenChange={setShowScheduleForm}
      />

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose <span className="text-primary">FitCalcs?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with proven fitness expertise to help you achieve your health and wellness goals.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <AboutCard
              icon={Building}
              title="Expert Team"
              description="Our certified fitness professionals bring years of experience to guide your journey."
            />
            <AboutCard
              icon={Users}
              title="Community Driven"
              description="Join thousands of users who are transforming their lives with our tools."
            />
            <AboutCard
              icon={Trophy}
              title="Proven Results"
              description="Science-based calculations and methods that deliver real results."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our <span className="text-primary">Fitness Tools</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our comprehensive suite of fitness calculators designed to help you track, measure, and achieve your health and fitness goals with precision and ease.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
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
            ].map(({ icon: Icon, title, description, path }) => (
              <Link key={title} to={path} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                <FeatureCard
                  icon={Icon}
                  title={title}
                  description={description}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What Our <span className="text-primary">Users Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their fitness journey with FitCalcs.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <TestimonialCard
              quote="The calculators are so accurate and easy to use. They've helped me stay on track with my fitness goals!"
              author="Sarah Mitchell"
              role="Fitness Enthusiast"
              rating={5}
            />
            <TestimonialCard
              quote="As a personal trainer, I recommend FitCalcs to all my clients. It's an invaluable tool for tracking progress."
              author="Mike Johnson"
              role="Personal Trainer"
              rating={5}
            />
            <TestimonialCard
              quote="The TDEE calculator helped me understand my nutritional needs. I've lost 20 pounds using these tools!"
              author="Emily Roberts"
              role="Weight Loss Success"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about our fitness calculators and tools.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate are the calculators?</AccordionTrigger>
                <AccordionContent>
                  Our calculators use scientifically validated formulas and provide highly accurate results when provided with accurate input data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How often should I recalculate my metrics?</AccordionTrigger>
                <AccordionContent>
                  We recommend recalculating every 4-6 weeks or whenever there's a significant change in your weight or activity level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I track my progress over time?</AccordionTrigger>
                <AccordionContent>
                  Yes! Create an account to save your calculations and track your fitness journey progress over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Are the calculations suitable for everyone?</AccordionTrigger>
                <AccordionContent>
                  Our calculators are designed for adults 18-65 years old. Consult with healthcare providers for personalized advice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Still have questions? We're here to help!
            </p>
            <Button 
              className="btn-modern"
              onClick={() => setShowScheduleForm(true)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, rating }: { quote: string; author: string; role: string; rating: number }) => (
  <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
    <div className="mb-4">
      <Quote className="w-8 h-8 text-primary opacity-50" />
    </div>
    <p className="text-muted-foreground mb-4 italic">{quote}</p>
    <div className="flex items-center justify-center mb-2">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
      ))}
    </div>
    <h4 className="text-foreground font-semibold">{author}</h4>
    <p className="text-muted-foreground text-sm">{role}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <Card
    className="p-6 rounded-xl bg-card border border-border hover:bg-accent/5 transition-colors cursor-pointer hover:scale-105 transform duration-[3000ms]"
  >
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

const AboutCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">{title}</h3>
    <p className="text-muted-foreground text-center">{description}</p>
  </div>
);

export default Home;
