import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import Image from "next/image";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
                    <div className="w-32 text-white md:w-36 mx-auto">
                        <Image
                            src="/logo_transparent.png"     // <-- replace with your logo file path
                            alt="Logo"
                            width={244}         // max width (w-36 = 144px)
                            height={144}        // keep it square, adjust as needed
                            className="w-full h-auto" // makes it responsive to w-32 / w-36
                        />
                    </div>
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}