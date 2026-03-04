'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-3 shadow-lg'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-lg shadow-blue-500/20">
                        <span className="text-white font-black text-sm tracking-tighter">B</span>
                    </div>
                    <span className={`text-xl font-black transition-colors ${scrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-white'}`}>
                        BINO.APP
                    </span>
                </a>

                <div className="hidden md:flex items-center gap-10">
                    <a href="/problem" className={`text-sm font-bold transition-all hover:scale-105 ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}>The Problem</a>
                    <a href="/api" className={`text-sm font-bold transition-all hover:scale-105 ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600' : 'text-white hover:text-blue-400'}`}>API & Docs</a>
                    <a
                        href="https://github.com/digeesh038"
                        target="_blank"
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-105 shadow-xl ${scrolled
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                            : 'bg-white text-gray-900 hover:bg-gray-100 shadow-white/10'
                            }`}
                    >
                        GitHub
                    </a>
                </div>

                {/* Mobile menu could go here if needed, but keeping it premium/minimal for now */}
            </div>
        </nav>
    );
}
