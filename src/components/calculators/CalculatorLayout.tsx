
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const CalculatorLayout = ({ title, description, children }: CalculatorLayoutProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-background border-border">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export default CalculatorLayout;
