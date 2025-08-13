"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "../ui/dialog";
import { Storygallery } from "@/lib/types";

export default function StoryGallery({ images }: Storygallery) {
  const emblaRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<null | {
    url: string;
    alt: string;
    caption?: string;
  }>(null);

  const open = (img: { url: string; alt: string; caption?: string }) => {
    setLightbox(img);
  };

  const close = () => {
    setLightbox(null);
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => open(img)}
              className="shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[33%] overflow-hidden rounded-md border border-border"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-5xl">
          {lightbox && (
            <figure>
              <img
                src={lightbox.url}
                alt={lightbox.alt}
                className="w-full h-auto rounded-lg"
              />
              {(lightbox.caption || lightbox.alt) && (
                <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                  {lightbox.caption || lightbox.alt}
                </figcaption>
              )}
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
