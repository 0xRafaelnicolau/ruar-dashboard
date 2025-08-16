import {
    Users,
    Home,
    Briefcase,
} from 'lucide-react';

const links = [
    { name: 'Painel', href: '/dashboard', icon: Home },
    {
        name: 'Serviços',
        href: '/dashboard/services',
        icon: Briefcase,
    },
    {
        name: 'Clientes',
        href: '/dashboard/customers',
        icon: Users
    },
];

export default function NavLinks() {
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <a
                        key={link.name}
                        href={link.href}
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <LinkIcon className="w-6 hidden md:block" />
                        <p className="block md:hidden">{link.name}</p>
                        <p className="hidden md:block">{link.name}</p>
                    </a>
                );
            })}
        </>
    );
}