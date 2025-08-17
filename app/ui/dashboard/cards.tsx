import {
    Banknote,
    CheckCircle,
    Clock,
    TrendingUp,
} from 'lucide-react';
import { montserrat } from '@/app/ui/fonts';

const iconMap = {
    gross: Banknote,
    profit: TrendingUp,
    collected: CheckCircle,
    pending: Clock,
};

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'gross' | 'profit' | 'collected' | 'pending';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-black" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${montserrat.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}