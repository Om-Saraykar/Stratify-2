// src/app/dashboard/page.tsx (Server Component)
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "@/components/views/tasks/data/schema";
import ClientDashboard from "./client-dashboard";
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"; // Import redirect from Next.js

// You can fetch all necessary data here, or pass functions to client components that will fetch on demand.
// For simplicity, let's fetch tasks data here. You can extend this for other data.
async function getTasksData() {
  // Ensure the path is correct relative to process.cwd() (project root)
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/views/tasks/data/tasks.json")
  );
  const tasks = JSON.parse(data.toString());
  return z.array(taskSchema).parse(tasks);
}

// You can also move `getTasks` from `src/app/tasks/page.tsx` here,
// or make `src/app/tasks/page.tsx` purely for rendering the data.

export default async function DashboardPage() {
  // 1. Get the session on the server
  const session = await getServerSession(authOptions);

  // 2. If no session, redirect to login page
  if (!session) {
    redirect('/login'); // Assuming '/login' is your custom login page
  }

  // 3. If authenticated, fetch data and render the client component
  const initialTasks = await getTasksData(); // Fetch tasks on the server

  // You would fetch other initial data here for Notes, TodoList, etc.
  // const initialNotes = await getNotesData();

  return (
    // Pass the fetched data and session to your Client Component
    <ClientDashboard
      initialTasks={initialTasks}
      session={session} // Pass the session data if the client component needs it
    /* initialNotes={initialNotes} */
    />
  );
}