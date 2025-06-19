// src/app/dashboard/client-dashboard.tsx
"use client"; // IMPORTANT: Keep this directive!

import { useState } from "react";
import { Session } from "next-auth";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Notes from "@/components/views/notes/page";
import Tasks from "@/components/views/tasks/page";
import Journal from "@/components/views/journal/page";
import CalendarView from "@/components/views/calendar/page";
import SearchView from "@/components/views/search/page";
import AIChat from "@/components/views/ai-chat/page";
import Insights from "@/components/views/insights/page";
import Settings from "@/components/views/settings/page";

// It's good practice to define the exact type for tasks, e.g., from your schema
// import { Task } from "@/components/views/tasks/data/schema";

interface ClientDashboardProps {
  initialTasks: any[]; // Consider using a more specific type like `Task[]` if defined
  session: Session; // Add the session prop here
}

export default function ClientDashboard({ initialTasks, session }: ClientDashboardProps) {
  const [activeItem, setActiveItem] = useState("Notes");

  const renderContent = () => {
    switch (activeItem) {
      case "Notes":
        return <Notes />;
      case "Tasks":
        return <Tasks data={initialTasks} />;
      case "Journaling":
        return <Journal />;
      case "Calendar":
        return <CalendarView />;
      case "Search":
        return <SearchView />;
      case "AI Chat":
        return <AIChat />;
      case "Insights":
        return <Insights />;
      case "Settings":
        return <Settings />;
      default:
        return <Notes />;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar activeItem={activeItem} onSelect={setActiveItem} variant="inset" session={session} />
      <SidebarInset>
        <SiteHeader title={activeItem} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}