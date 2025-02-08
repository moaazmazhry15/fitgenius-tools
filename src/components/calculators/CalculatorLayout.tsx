
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const CalculatorLayout = ({ title, description, children }: CalculatorLayoutProps) => {
  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <Card className="w-full max-w-2xl mx-auto bg-background border-border">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
};

export default CalculatorLayout;

