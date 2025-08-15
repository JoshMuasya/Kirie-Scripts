"use client"

import React, { useEffect, useState } from 'react'
import StoryList from '../Stories/StoryList'
import { Story } from '@/lib/types';
import toast from 'react-hot-toast';

const Recent = () => {
    const [recent, setRecent] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchstories = async () => {
        try {
            setLoading(true)

            const res = await fetch("/api/stories/get");

            if (!res.ok) throw new Error("Failed to fetch stories")
            const data = await res.json()
            setRecent(data)
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch stories")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchstories()
    }, [])

    return (
        <section className="my-10 mx-3 md:mx-5">
            <h2 className="text-2xl font-semibold">Recent stories</h2>
            <StoryList stories={recent} />
        </section>
    )
}

export default Recent
