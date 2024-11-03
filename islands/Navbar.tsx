import { h } from "preact";
import { useState } from "preact/hooks";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav class="bg-gray-900 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo and App Name */}
                <a href="/" class="flex items-center space-x-3">
                    <img
                        class="h-10 w-10"
                        src="/logo.png"
                        alt="FamAIly logo: AI-powered family law support"
                    />
                    <span class="text-2xl font-bold">
                        fam
                        <span class="text-blue-400 text-3xl font-extrabold tracking-tight">
                            A.I.
                        </span>
                        ly Lawyer
                    </span>
                </a>

                {/* Desktop Menu */}
                <ul class="hidden md:flex space-x-6 items-center">
                    <li class="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            class="w-5 h-5 text-blue-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M3 6v15c0 .5.4 1 1 1h16c.5 0 1-.5 1-1V6H3zm8 12H8v-2h3v2zm5-4H8v-2h8v2zm0-4H8V8h8v2zm3-8H5c-.5 0-1 .5-1 1v2h18V3c0-.5-.5-1-1-1z" />
                        </svg>
                        <a href="/documents" class="hover:text-blue-400">
                            Documents
                        </a>
                    </li>
                    {/* <li class="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            class="w-5 h-5 text-blue-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 11H5v2h2v-2zm8 0h-2v2h2v-2zm6-8H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 19H3V5h18v14z" />
                        </svg>
                        <a href="/calendar" class="hover:text-blue-400">
                            Calendar
                        </a>
                    </li>
                    <li class="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            class="w-5 h-5 text-blue-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M3 6h18v2H3V6zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
                        </svg>
                        <a href="/journals" class="hover:text-blue-400">
                            Journals
                        </a>
                    </li> */}
                    <li class="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            class="w-5 h-5 text-blue-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M11.92 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.1l-6.4-6.4zM14 16h-4v-2h4v2zm2-4H8v-2h8v2zm0-4H8V6h4v2z" />
                        </svg>
                        <a href="/case-law" class="hover:text-blue-400">
                            Case Law
                        </a>
                    </li>
                    <li class="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            class="w-5 h-5 text-blue-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3 13h-2v2H9v-2H7v-2h2v-2h4v2h2v2z" />
                        </svg>
                        <a href="/ai-generation" class="hover:text-blue-400">
                            A.I. Generation
                        </a>
                    </li>
                    <li class="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            class="w-5 h-5 text-blue-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5zm10.5-7v2h-5V6h5z" />
                        </svg>
                        <a href="/gallery" class="hover:text-blue-400">
                            Gallery
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    class="md:hidden flex items-center text-gray-300 hover:text-blue-400 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div class="md:hidden bg-gray-900 shadow-lg">
                    <ul class="px-4 pt-2 pb-3 space-y-1 text-gray-300">
                        <li>
                            <a
                                href="/documents"
                                class="block px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white"
                            >
                                Documents
                            </a>
                        </li>
                        <li>
                            <a
                                href="/calendar"
                                class="block px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white"
                            >
                                Calendar
                            </a>
                        </li>
                        <li>
                            <a
                                href="/journals"
                                class="block px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white"
                            >
                                Journals
                            </a>
                        </li>
                        <li>
                            <a
                                href="/case-law"
                                class="block px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white"
                            >
                                Case Law
                            </a>
                        </li>
                        <li>
                            <a
                                href="/ai-generation"
                                class="block px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white"
                            >
                                A.I. Generation
                            </a>
                        </li>
                        <li>
                            <a
                                href="/gallery"
                                class="block px-3 py-2 rounded-md hover:bg-blue-400 hover:text-white"
                            >
                                Gallery
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
