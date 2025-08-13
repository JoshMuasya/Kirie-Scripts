"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sampleStories } from "@/lib/SampleStories";
import SEO from "@/components/SEO/SEO";
import StoryGallery from "@/components/Stories/StoryGallery";
import { Story } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StoryDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
  const foundStory = sampleStories.find((s) => s.slug === slug) || null;
  setStory(foundStory);
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
        ogImage={story.ogImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.excerpt,
          image: story.ogImage || story.images[0]?.url,
          author: { "@type": "Person", name: story.author.name },
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
            <span>•</span>
            <span>By {story.author.name}</span>
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

        <StoryGallery images={story.images} />

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
