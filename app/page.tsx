import Logo from '@/app/ui/logo';

export default function Page() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-black flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full">
          <Logo />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-black">Welcome to Ruar Dashboard</h1>
      </div>
    </div>
  );
}
