'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <input
                    id="search"
                    className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
            </div>
        </div>
    );
}