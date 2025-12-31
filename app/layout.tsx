import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: {
        template: '%s | AI Auto Invoicing',
        default: 'AI Auto Invoicing',
    },
    icons: { icon: "/favicon.png", },
    description: 'AI Auto Invoicing.',
    metadataBase: new URL('https://ai-auto-invoicing.vercel.app/'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
