'use client';

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    CpuChipIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Invoices', href: '/dashboard/aiinvoices', icon: DocumentDuplicateIcon },
    { name: 'Customers', href: '/dashboard/aicustomers', icon: UserGroupIcon },
    {
        name: 'AI Agents', icon: CpuChipIcon, children: [
            { name: 'Dividends', href: '/dashboard/aiagents/dividends' },
            { name: 'Deals', href: '/dashboard/aiagents/deals' },
            { name: 'Wages', href: '/dashboard/aiagents/wages' },
        ],
    },
];

export default function NavLinks() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false); // default expanded if you want

    return (
        <>
            {links.map((link) => {
                const Icon = link.icon;
                const isActiveChild =
                    link.children?.some((c) => pathname === c.href);

                return (
                    <div key={link.name}>
                        {/* Parent */}
                        {link.children ? (
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className={clsx(
                                    'flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                                    {
                                        'bg-sky-100 text-blue-600': isActiveChild,
                                    }
                                )}
                            >
                                <Icon className="w-6" />
                                <span className="hidden md:block flex-1 text-left">
                                    {link.name}
                                </span>
                                <ChevronDownIcon
                                    className={clsx(
                                        'w-4 transition-transform',
                                        open && 'rotate-180'
                                    )}
                                />
                            </button>
                        ) : (
                            <Link
                                href={link.href}
                                className={clsx(
                                    'flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                                    {
                                        'bg-sky-100 text-blue-600': pathname === link.href,
                                    }
                                )}
                            >
                                <Icon className="w-6" />
                                <span className="hidden md:block">{link.name}</span>
                            </Link>
                        )}

                        {/* Submenu */}
                        {link.children && open && (
                            <div className="ml-8 mt-1 space-y-1">
                                {link.children.map((child) => (
                                    <Link
                                        key={child.name}
                                        href={child.href}
                                        className={clsx(
                                            'block rounded-md px-3 py-2 text-sm hover:bg-sky-50 hover:text-blue-600',
                                            {
                                                'text-blue-600 font-medium':
                                                    pathname === child.href,
                                            }
                                        )}
                                    >
                                        {child.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}
