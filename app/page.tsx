import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function Page() {
    return (
        <main className="flex flex-col min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <header className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 md:py-24">
                {/* Text content */}
                <div className="md:w-1/2 text-center md:text-right md:pr-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
                        AI Auto <span className="text-blue-600">Invoicing</span> 
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Fast, accurate, and professional<br />
                        designed for freelancers, small businesses.
                    </p>

                    <div className="flex justify-center md:justify-end gap-4">
                        <Link href="https://play.google.com/store/apps/details?id=com.aixpertlab.aiautoinvoicing" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />Download
                        </Link>

                        <Link href="/login" className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition"                        >
                            Login <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Phone image */}
                <div className="md:w-1/2 flex justify-center md:justify-start mt-12 md:mt-0">
                    <div className="relative w-[230px] md:w-[280px]">
                        <Image
                            src="/phone2.jpg"
                            width={500}
                            height={500}
                            alt="AI Auto Invoicing preview"
                            className="rounded-[2rem] shadow-2xl"
                            priority
                        />
                    </div>
                </div>
            </header>

            {/* Footer */}
            <footer className="mt-auto py-10 text-center border-t text-gray-500 text-sm">
                <ul className="flex justify-center gap-6 mb-4">
                    <li>
                        <a
                            href="https://facebook.com/aiautoinvoicing"
                            className="text-gray-500 hover:text-blue-600"
                        >
                            <i className="fab fa-facebook-f text-lg"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://x.com/aiautoinvoicing"
                            className="text-gray-500 hover:text-blue-600"
                        >
                            <i className="fab fa-twitter text-lg"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://reddit.com/r/AIAutoInvoicing"
                            className="text-gray-500 hover:text-blue-600"
                        >
                            <i className="fab fa-reddit text-lg"></i>
                        </a>
                    </li>
                </ul>
                <p>&copy; {new Date().getFullYear()} AI Auto Invoicing</p>
            </footer>
        </main>
    );
}
