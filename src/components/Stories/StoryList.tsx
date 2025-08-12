import { Stories } from '@/lib/types'
import React from 'react'
import StoryCard from './StoryCard'

const StoryList = ({ stories }: Stories) => {
  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((s, i) => (
        <StoryCard key={s.id} story={s} index={i} />
      ))}
    </section>
  )
}

export default StoryList
