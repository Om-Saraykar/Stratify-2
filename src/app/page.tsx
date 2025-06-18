import Link from 'next/link';
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h1>Hello There, Welcome to Stratify 2!</h1>
      <Link href="/dashboard">
        <Button className='cursor-pointer'>
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
