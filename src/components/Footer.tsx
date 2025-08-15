"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-t border-border shadow-[0_-4px_12px_2px_rgba(168,85,247,0.2)]">
            <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <Link
                        href="/"
                        className="font-semibold tracking-tight text-2xl md:text-3xl"
                        style={{
                            background: 'linear-gradient(to right, #ffffff, #a855f7)', // White to purple gradient
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Kirie Scripts
                    </Link>
                </motion.div>
                <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground">
                    <p>Contact: <a href="mailto:contact@kiriescripts.com" className="hover:text-purple-500 transition-colors">contact@kiriescripts.com</a></p>
                    <div className="flex gap-4">
                        <a href="https://x.com/kiriescripts" className="hover:text-purple-500 transition-colors">X</a>
                        <a href="https://github.com/kiriescripts" className="hover:text-purple-500 transition-colors">Instagram</a>
                    </div>
                    <p className=''>
                        Developed by{' '}
                        <a
                            href="https://digimatic2-0.vercel.app/"
                            className="hover:text-purple-500 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Digimatic
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;