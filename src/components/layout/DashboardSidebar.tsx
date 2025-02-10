
import { Calendar, Home, MessageSquare, Settings, User, Dumbbell, Apple, CupSoda, ShoppingCart, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Navigation",
    items: [
      { title: "Home", icon: Home, url: "/" },
      { title: "Profile", icon: User, url: "/profile" },
      { title: "Messages", icon: MessageSquare, url: "/messages" },
      { title: "Settings", icon: Settings, url: "/settings" },
    ],
  },
  {
    label: "Fitness",
    items: [
      { title: "Calendar", icon: Calendar, url: "/calendar" },
      { title: "Workouts", icon: Dumbbell, url: "/workouts" },
      { title: "Nutrition", icon: Apple, url: "/nutrition" },
      { title: "Water Intake", icon: CupSoda, url: "/water" },
      { title: "Shopping List", icon: ShoppingCart, url: "/shopping" },
    ],
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <div className="flex h-16 items-center border-b border-border px-4">
        <h2 className="text-lg font-semibold">FitGenius</h2>
        <SidebarTrigger className="ml-auto h-8 w-8">
          <ChevronDown className="h-4 w-4" />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        {menuItems.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
