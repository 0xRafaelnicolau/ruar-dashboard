import { montserrat } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Logo() {
    return (
        <div
            className={`${montserrat.className} flex flex-row items-center leading-none text-white`}
        >
            <Image
                src="/logo.jpg"
                alt="Ruar Logo"
                width={128}
                height={128}
                priority
            />
        </div>
    );
}