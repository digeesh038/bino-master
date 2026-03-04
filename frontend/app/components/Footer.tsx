'use client';
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0d0d0d] border-t border-gray-100 dark:border-gray-900 py-20 px-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="col-span-1 md:col-span-2">
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">BINO.APP</div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
                        The ultimate dynamic page engine for modern teams. Build, launch, and scale landing pages instantly using our powerful JSON-driven API.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all">🐦</a>
                        <a href="https://github.com/digeesh038" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all">🐙</a>
                        <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all">💼</a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Platform</span>
                        <a href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
                        <a href="/problem" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Why Bino?</a>
                        <a href="/api" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Resources</span>
                        <a href="/api" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a>
                        <a href="/api" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Playground</a>
                        <a href="/demo-page" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Live Demo</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                <div>&copy; {new Date().getFullYear()} Bino Dynamic Engine.</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
