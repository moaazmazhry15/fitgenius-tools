
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQSectionProps {
  onScheduleClick: () => void;
}

const FAQSection = ({ onScheduleClick }: FAQSectionProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about our fitness calculators and tools.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
              <img 
                src="/photo-1461749280684-dccba630e2f6"
                alt="Fitness Calculator Interface"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <div className="w-full md:w-1/2">
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

            <div className="text-center mt-8">
              <Button 
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg rounded-full btn-modern hover:scale-105 transform duration-300"
                onClick={onScheduleClick}
              >
                Get Personalized Help <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
