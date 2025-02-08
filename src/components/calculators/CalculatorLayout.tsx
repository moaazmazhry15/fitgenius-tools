
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const CalculatorLayout = ({ title, description, children }: CalculatorLayoutProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CalculatorLayout;
