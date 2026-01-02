import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { uploadReports } from '@/app/lib/actions';

export default function UploadForm({ customers }: { customers: CustomerField[] }) {
    return (
        <form action={uploadReports}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Choose Client
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            required
                            defaultValue=""
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
                        >
                            <option value="" disabled>
                                Select a client
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* File */}
                <div className="mb-4">
                    <label htmlFor="file" className="mb-2 block text-sm font-medium">
                        Upload CSV Report
                    </label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        accept=".csv,text/csv"
                        required
                        className="block w-full text-sm"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/invoices"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Upload</Button>
            </div>
        </form>
    );
}
