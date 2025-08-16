import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/logo';
import { ArrowLeftToLine } from 'lucide-react';

export default function SideNav() {
    return (
        <>
            {/* Mobile Top Navbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black w-full">
                <div className="flex items-center justify-between px-4 py-1">
                    {/* Logo */}
                    <Link href="https://ruar.pt" className="flex items-center">
                        <div className="text-white">
                            <div className="scale-[1.25]">
                                <Logo />
                            </div>
                        </div>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <label htmlFor="mobile-menu-toggle" className="cursor-pointer">
                        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                            <span className="w-6 h-0.5 bg-white transition-all duration-300 peer-checked:rotate-45 peer-checked:translate-y-1.5"></span>
                            <span className="w-6 h-0.5 bg-white transition-all duration-300 peer-checked:opacity-0"></span>
                            <span className="w-6 h-0.5 bg-white transition-all duration-300 peer-checked:-rotate-45 peer-checked:-translate-y-1.5"></span>
                        </div>
                    </label>
                </div>

                {/* Mobile Menu Overlay */}
                <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
                <div className="peer-checked:block hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="px-4 py-2 space-y-2">
                        <NavLinks />
                        <form>
                            <Link href="/">
                                <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
                                    <ArrowLeftToLine className="w-6 hidden md:block" />
                                    <div>Sair</div>
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex h-full flex-col px-3 py-4 md:px-2">
                <Link
                    className="mb-2 flex h-20 items-center justify-center rounded-md bg-black p-4 md:h-40"
                    href="https://ruar.pt"
                >
                    <div className="text-white">
                        <div className="scale-[2]">
                            <Logo />
                        </div>

                    </div>
                </Link>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                    <NavLinks />
                    <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                    <form>
                        {/* TODO: Refactor this to eventually add authentication */}
                        <Link href="/">
                            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                                <ArrowLeftToLine className="w-6" />
                                <div className="hidden md:block">Sair</div>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>

            {/* Mobile Spacer */}
            <div className="md:hidden h-10"></div>
        </>
    );
}