"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import SEO from "@/components/SEO/SEO";
import { Story } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import toast from "react-hot-toast";

export default function StoryDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStory = async () => {
    try {
      const res = await fetch(`/api/stories/${slug}`, {
        cache: "no-store"
      })

      if (!res.ok) {
        throw new Error("Failed to fetch story");
      }

      const data = await res.json();

      setStory(data)

    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStory()
  }, [slug]);

  if (!story) {
    return (
      <main className="min-h-screen grid place-items-center">
        <div className="text-center">
          <p className="text-lg">Story not found.</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </main>
    );
  }

  const onShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.excerpt,
          url,
        });
      } catch {
        // ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO
        fullTitle={story.title}
        description={story.excerpt}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.excerpt,
          image: story.themeImage,
          datePublished: story.publishedAt,
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={story.publishedAt}>
              {new Date(story.publishedAt).toLocaleDateString()}
            </time>
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            {story.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{story.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {story.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground border border-border"
              >
                #{t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={onShare} variant="default">
              Share
            </Button>
            <Button asChild variant="secondary">
              <Link href="/stories">Back to stories</Link>
            </Button>
          </div>
        </motion.header>

        {story.themeImage ? (
          <Image
            src={story.themeImage}
            alt={story.title}
            width={400}
            height={200}
            className="rounded-t-lg object-cover"
            onError={(e) => {
              console.error(`Failed to load image for ${story.title}: ${story.themeImage}`);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-t-lg">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        <motion.section
          className="mt-8 space-y-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {story.content}
          </ReactMarkdown>
        </motion.section>
      </article>
    </main>
  );
}
