// src/components/views/tasks/page.tsx
// This component should NOT have "use client" if it's only displaying data passed to it.
// If it needs client-side interactivity *beyond* just displaying the table, then add "use client"
// and ensure its children also handle data appropriately.

import Image from "next/image";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
// No need for 'fs', 'path', 'z' or 'taskSchema' imports here anymore
// if the data is passed as a prop from a parent Server Component.

// Define the props for your Tasks component
interface TasksPageProps {
  data: any[]; // Use the actual type for your tasks
}

// Rename to TaskView or something clearer if it's not a root page
export default function Tasks({ data }: TasksPageProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        {/* Pass the data received as a prop to DataTable */}
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}