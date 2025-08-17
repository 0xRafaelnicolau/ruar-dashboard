import { UpdateService, DeleteService, ViewService } from '@/app/ui/services/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredServices } from '@/app/lib/data';

export default async function ServicesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const services = await fetchFilteredServices(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {services?.map((service) => (
                            <div
                                key={service.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p className="font-medium">{service.service_name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{service.customer_name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{service.type}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {("€" + service.amount)}
                                        </p>
                                        <p className="text-sm text-gray-500">{formatDateToLocal(service.date)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <ViewService id={service.id} />
                                        <UpdateService id={service.id} />
                                        <DeleteService id={service.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table table-fixed">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="w-1/4 px-6 py-5 font-medium">
                                    Serviço
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    Cliente
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    Tipo
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    Valor
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    Data
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    <span className="sr-only">Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {services?.map((service) => (
                                <tr
                                    key={service.id}
                                    className="w-full py-3 text-sm [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="py-3 px-6 w-1/4">
                                        <div className="flex flex-col min-w-0">
                                            <p className="font-medium truncate max-w-[200px]">{service.service_name}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{service.description}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 w-1/6">
                                        <p className="truncate">{service.customer_name}</p>
                                    </td>
                                    <td className="py-3 px-6 w-1/6">
                                        <span className="capitalize bg-gray-100 px-3 py-1 rounded-full text-xs inline-block text-center max-w-full truncate">
                                            {service.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 w-1/6">
                                        <span className="font-medium truncate">€{service.amount}</span>
                                    </td>
                                    <td className="py-3 px-6 w-1/6">
                                        <span className="text-gray-500 truncate">{formatDateToLocal(service.date)}</span>
                                    </td>
                                    <td className="py-3 px-6 w-1/6">
                                        <div className="flex justify-end gap-3">
                                            <ViewService id={service.id} />
                                            <UpdateService id={service.id} />
                                            <DeleteService id={service.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}