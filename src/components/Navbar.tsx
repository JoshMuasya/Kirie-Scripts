"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b border-border shadow-[0_4px_12px_2px_rgba(168,85,247,0.2)]">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <Link
                        href="/"
                        className="font-semibold tracking-tight text-2xl md:text-3xl" // Increased size
                        style={{
                            background: 'linear-gradient(to right, #ffffff, #a855f7)', // White to purple gradient
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Kirie Scripts
                    </Link>
                </motion.div>
                <div className="flex items-center gap-6 text-sm">
                    <motion.div
                        whileHover={{ scale: 1.05, color: '#ffffff' }} // White on hover
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            href="/stories"
                            className={`${
                                pathname === '/stories'
                                    ? 'text-purple-500' // Purple when active
                                    : 'text-muted-foreground'
                            } hover:text-foreground transition-colors`}
                        >
                            Stories
                        </Link>
                    </motion.div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;