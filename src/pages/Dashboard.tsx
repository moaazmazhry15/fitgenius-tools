
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
    <main className="min-h-screen pb-16">
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8 bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-primary">
            Hello, {username}
          </h1>
          <p className="text-lg text-muted-foreground">
            {format(new Date(), "EEEE, MMMM do, yyyy")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <ProfileSection userEmail={userEmail} />
          </div>
          <div className="bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <WorkoutSection userId={userId} />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
          <div className="bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg lg:col-span-2">
            <MealTracker />
          </div>
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <WaterTracker />
            </div>
            <div className="bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <GroceryList />
            </div>
          </div>
        </div>

        <div className="bg-card/95 backdrop-blur-lg rounded-xl p-6 shadow-lg mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Your Progress</h2>
          <DashboardCharts userId={userId} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
