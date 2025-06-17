// src/app/dashboard/client-dashboard.tsx
"use client"; // IMPORTANT: Keep this directive!

import { useState } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// Import your view components.
// IMPORTANT: These components (Notes, TodoList, Tasks, etc.)
// should now be designed to accept *props* with the data they need,
// rather than fetching it themselves if they are rendered by a client component.
import Notes from "@/components/views/notes/page";
import Tasks from "@/components/views/tasks/page"; // This Tasks component needs adjustment
import Journal from "@/components/views/journal/page";
import CalendarView from "@/components/views/calendar/page";
import SearchView from "@/components/views/search/page";
import AIChat from "@/components/views/ai-chat/page";
import Insights from "@/components/views/insights/page";
import Settings from "@/components/views/settings/page";

// Define the props for your ClientDashboard
interface ClientDashboardProps {
  initialTasks: any[]; // Use the actual type for tasks
  // Add props for other initial data here
}

export default function ClientDashboard({ initialTasks }: ClientDashboardProps) {
  const [activeItem, setActiveItem] = useState("Notes"); 

  const renderContent = () => {
    switch (activeItem) {
      case "Notes":
        return <Notes />; // If Notes needs data, pass it here from props
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
      <AppSidebar activeItem={activeItem} onSelect={setActiveItem} variant="inset" />
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