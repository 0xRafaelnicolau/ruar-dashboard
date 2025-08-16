import { montserrat } from '@/app/ui/fonts';
import { CreateService } from '@/app/ui/services/buttons';
import { Suspense } from 'react';
import Search from '@/app/ui/search';
import { ServicesTableSkeleton } from '@/app/ui/skeletons';
import ServicesTable from '@/app/ui/services/table';
import { fetchServicesPages } from '@/app/lib/data';
import Pagination from '@/app/ui/services/pagination';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchServicesPages(query);

    return (
        <>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${montserrat.className} text-2xl`}>Serviços</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Pesquisar serviços..." />
                    <CreateService />
                </div>
                <Suspense key={query + currentPage} fallback={<ServicesTableSkeleton />}>
                    <ServicesTable query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    );
}