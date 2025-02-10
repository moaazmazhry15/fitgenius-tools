
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import MealTracker from "@/components/nutrition/MealTracker";
import WaterTracker from "@/components/nutrition/WaterTracker";
import GroceryList from "@/components/nutrition/GroceryList";
import ProfileSection from "@/components/profile/ProfileSection";
import WorkoutSection from "@/components/workouts/WorkoutSection";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserEmail(session.user.email || "");
      setUserId(session.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();

      setUsername(profile?.username || session.user.email?.split("@")[0] || "User");
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 container mx-auto px-4 py-24">
          {/* Welcome Header */}
          <div className="flex justify-between items-center mb-8 glass-card animate-fade-in">
            <h1 className="text-3xl font-bold text-primary">
              Hello, {username}
            </h1>
            <p className="text-lg text-muted-foreground">
              {format(new Date(), "EEEE, MMMM do, yyyy")}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8">
            {/* Top Section - Profile and Workout */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass-card">
                <ProfileSection userEmail={userEmail} />
              </div>
              <div className="glass-card">
                <WorkoutSection userId={userId} />
              </div>
            </div>

            {/* Middle Section - Nutrition Tracking */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="glass-card md:col-span-2">
                <MealTracker />
              </div>
              <div className="space-y-6">
                <div className="glass-card">
                  <WaterTracker />
                </div>
                <div className="glass-card">
                  <GroceryList />
                </div>
              </div>
            </div>

            {/* Bottom Section - Progress Charts */}
            <div className="glass-card animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Your Progress</h2>
              <DashboardCharts userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
