import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';

export default function NotesPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <PlateEditor />
    </div>
  );
}
