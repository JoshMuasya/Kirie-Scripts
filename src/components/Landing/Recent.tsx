import React from 'react'
import StoryList from '../Stories/StoryList'
import { sampleStories } from '@/lib/SampleStories';

const Recent = () => {
    const recent = sampleStories;

    return (
        <section className="my-10 mx-3 md:mt-5">
            <h2 className="text-2xl font-semibold">Recent stories</h2>
            <StoryList stories={recent} />
        </section>
    )
}

export default Recent
