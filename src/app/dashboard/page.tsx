// src/app/dashboard/page.tsx (This is a Server Component, NO "use client")
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "@/components/views/tasks/data/schema"; // Adjust path if needed
import ClientDashboard from "./client-dashboard"; // Import the client component

// You can fetch all necessary data here, or pass functions to client components that will fetch on demand.
// For simplicity, let's fetch tasks data here. You can extend this for other data.
async function getTasksData() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/views/tasks/data/tasks.json")
  );
  const tasks = JSON.parse(data.toString());
  return z.array(taskSchema).parse(tasks);
}

// You can also move `getTasks` from `src/app/tasks/page.tsx` here,
// or make `src/app/tasks/page.tsx` purely for rendering the data.

export default async function DashboardPage() {
  const initialTasks = await getTasksData(); // Fetch tasks on the server

  // You would fetch other initial data here for Notes, TodoList, etc.
  // const initialNotes = await getNotesData();

  return (
    // Pass the fetched data as props to your Client Component
    <ClientDashboard initialTasks={initialTasks} /* initialNotes={initialNotes} */ />
  );
}