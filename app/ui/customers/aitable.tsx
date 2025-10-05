'use client';

import { lusitana } from '@/app/ui/fonts';
import { FormattedAICustomersTable } from '@/app/lib/definitions';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedAICustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((c) => (
          <div
            key={c.id}
            className="rounded-md bg-white p-4 shadow-sm border"
          >
            <p className="font-medium text-lg">{c.client_company_name}</p>
            <p className="text-sm text-gray-600">{c.client_contact_name}</p>
            <p className="text-sm text-gray-500">{c.client_email}</p>
            <p className="text-sm text-gray-500">{c.client_mainphone}</p>
            <p className="text-sm text-gray-500">
              Payment Term: {c.client_payment_term}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
