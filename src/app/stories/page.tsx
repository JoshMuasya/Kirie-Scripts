import SEO from '@/components/SEO/SEO'
import StoryList from '@/components/Stories/StoryList'
import { sampleStories } from '@/lib/SampleStories'
import React from 'react'

const page = () => {
    
  return (
    <main className="min-h-screen bg-background">
      <SEO
        fullTitle="Stories"
        description="Browse all Kirie Scripts stories: dark, minimal tech writing with smooth animations."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">All stories</h1>
        <StoryList stories={sampleStories} />
      </div>
    </main>
  )
}

export default page
