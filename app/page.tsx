import Logo from '@/app/ui/logo';
import { Button } from '@/app/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-black flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full">
          <Logo />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="text-center space-y-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-black">Welcome to Ruar Dashboard</h1>
          {/* TODO: Refactor this to eventually add authentication */}
          <Link href="/dashboard">
            <Button>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
