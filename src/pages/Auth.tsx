
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Signed in successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "signup" ? "Create an account" : "Welcome back"}</CardTitle>
          <CardDescription>
            {mode === "signup" 
              ? "Enter your email below to create your account" 
              : "Enter your email below to sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : mode === "signup" ? "Sign up" : "Sign in"}
            </Button>
            <div className="text-center text-sm">
              {mode === "signup" ? (
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal"
                    onClick={() => navigate("/auth")}
                  >
                    Sign in
                  </Button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal"
                    onClick={() => navigate("/auth?mode=signup")}
                  >
                    Sign up
                  </Button>
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
