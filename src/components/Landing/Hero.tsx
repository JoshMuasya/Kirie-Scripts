"use client"

import { Easing, motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Hero = () => {
    const buttonVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        hover: {
            scale: 1.05,
            boxShadow: 'var(--shadow-elegant)',
            transition: {
                duration: 0.2,
                ease: 'easeOut' as Easing,
            },
        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1,
            },
        },
    };

    return (
        <header
            className="relative overflow-hidden rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-elegant)] mt-3 md:mt-5"
            style={{ background: 'var(--gradient-primary)' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10"
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
                    style={{
                        fontFamily: "'Inter', sans-serif", // Clean, modern font for readability
                        letterSpacing: '-0.025em', // Slightly tighter for elegance
                        lineHeight: 1.2, // Improved readability for large text
                        color: 'hsl(var(--foreground))', // High-contrast foreground
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut' as Easing,
                        delay: 0.2, // Slight delay for staggered effect
                    }}
                >
                    Kirie Scripts
                </motion.h1>
                <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl">
                    Dark-themed, minimal tech writing about UI, systems, and engineering
                    craft. Readable typography, high contrast, and smooth motion.
                </p>
                <div className="mt-6 flex gap-3">
                    <motion.div
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Button
                            asChild
                            variant="secondary"
                            className="bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80 border border-[var(--border)] rounded-[var(--radius)] px-6 py-3 font-medium transition-colors duration-300"
                        >
                            <Link href="/stories">Read Stories</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Signature subtle animated glow */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full"
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ opacity: 0.7, scale: 1.05 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
                style={{
                    background: 'radial-gradient(closest-side, hsl(var(--primary) / 0.45), transparent)',
                    filter: 'blur(30px)',
                }}
            />
        </header>
    )
}

export default Hero
