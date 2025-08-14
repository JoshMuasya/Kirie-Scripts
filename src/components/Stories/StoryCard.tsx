"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { StoryIndex } from '@/lib/types';

const StoryCard = ({ story, index = 0 }: StoryIndex) => {
    const tsToDate = (ts: any) => {
        if (!ts) return null;
        if (typeof ts === "string" || typeof ts === "number") return new Date(ts);
        if (ts?.toDate) return ts.toDate();                 
        if (ts?.seconds) return new Date(ts.seconds * 1000); 
        return null;
    };

    const d = tsToDate(story.publishedAt);

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 12px 30px 0 rgba(168, 85, 247, 0.15)',
                borderRadius: '1rem',
            }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="h-full"
        >
            <Link href={`/stories/${story?.slug}`} aria-label={`Read: ${story?.title}`} className="block h-full">
                <Card className="overflow-hidden border-border bg-card transition-shadow h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden shrink-0">
                        <img
                            src={story?.themeImage}
                            alt={story?.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <CardContent className="p-4 flex-grow">
                        <h3 className="text-xl font-semibold">{story?.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {story?.excerpt}
                        </p>
                        <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
                            <span>{d ? d.toLocaleDateString() : "—"}</span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.article>
    );
};

export default StoryCard;