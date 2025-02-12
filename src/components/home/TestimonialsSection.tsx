
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
            What Our <span className="text-primary">Users Say</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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

        <div className="text-center mt-12">
          <Link to="/tools">
            <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg rounded-full btn-modern hover:scale-105 transform duration-300">
              Start Your Success Story <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
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

export default TestimonialsSection;
