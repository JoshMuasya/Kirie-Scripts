"use client"

import SEO from '@/components/SEO/SEO'
import StoryList from '@/components/Stories/StoryList'
import { sampleStories } from '@/lib/SampleStories'
import { Story } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(false);

  const fetchStories = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/stories/get");

      if (!res.ok) throw new Error("Failed to fetch stories");
      const data = await res.json()
      setStories(data)
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  console.log("Stories", stories)

  return (
    <main className="min-h-screen bg-background">
      <SEO
        fullTitle="Stories"
        description="Browse all Kirie Scripts stories: dark, minimal tech writing with smooth animations."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">All stories</h1>
        <StoryList stories={stories} />
      </div>
    </main>
  )
}

export default page
