"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { Story } from "@/lib/types";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase/firebase";

// Function to generate slug from title
const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 100);
};

export function AdminDashboard() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [form, setForm] = useState({
        id: "",
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        slug: "",
    });

    // Fetch all stories
    const fetchStories = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/stories/get");
            if (!res.ok) throw new Error("Failed to fetch stories");
            const data = await res.json();
            setStories(data);
        } catch (error) {
            toast.error("Failed to fetch stories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    // Handle file input change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    // Handle title change and auto-generate slug
    const handleTitleChange = (title: string) => {
        setForm({ ...form, title });
    };

    // Save new story
    const saveStory = async () => {
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("slug", generateSlug(form.title));
            formData.append("excerpt", form.excerpt);
            formData.append("content", form.content);
            formData.append("tags", JSON.stringify(form.tags.split(",").map(t => t.trim())));
            if (imageFile) {
                formData.append("themeImage", imageFile);
            }

            const user = auth.currentUser;

            if (!user) {
                toast.error("You must be logged in to do this");
                return;
            }

            const token = await auth.currentUser?.getIdToken()

            const res = await fetch("/api/stories/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });
            if (!res.ok) throw new Error("Failed to save story");

            toast.success("Story saved!");
            setForm({
                id: "",
                title: "",
                excerpt: "",
                content: "",
                tags: "",
                slug: ""
            });
            setImageFile(null);
            fetchStories();
        } catch (error) {
            toast.error("Error saving story");
        }
    };

    // Edit story
    const editStory = (story: Story) => {
        setForm({
            id: story.id,
            title: story.title,
            excerpt: story.excerpt,
            content: story.content,
            tags: story.tags.join(", "),
            slug: story.slug,
        });
        setImageFile(null);
    };

    // Update story
    const updateStory = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                toast.error("You must be logged in to do this");
                return;
            }

            const token = await user.getIdToken()

            if (!token) {
                toast.error("Failed to retrieve authentication token");
                return;
            }

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("slug", generateSlug(form.title));
            formData.append("excerpt", form.excerpt);
            formData.append("content", form.content);
            formData.append("tags", JSON.stringify(form.tags.split(",").map(t => t.trim())));
            if (imageFile) {
                formData.append("themeImage", imageFile);
            }

            const res = await fetch(`/api/stories/${form.slug}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });
            if (!res.ok) throw new Error("Failed to update story");

            toast.success("Story updated!");
            setForm({
                id: "",
                title: "",
                excerpt: "",
                content: "",
                tags: "",
                slug: ""
            });
            setImageFile(null);
            fetchStories();
        } catch (error) {
            toast.error("Error updating story");
        }
    };

    // Delete story
    const deleteStory = async (id: string) => {
        if (!confirm("Are you sure you want to delete this story?")) return;
        try {
            const user = auth.currentUser;
            if (!user) {
                toast.error("You must be logged in to do this");
                return;
            }

            const token = await auth.currentUser?.getIdToken()

            const res = await fetch(`/api/stories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error("Failed to delete story");

            toast.success("Story deleted!");
            fetchStories();
        } catch (error) {
            toast.error("Error deleting story");
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{form.id ? "Edit Story" : "Create New Story"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={form.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Excerpt</Label>
                        <Textarea
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Content (Markdown)</Label>
                        <Textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Tags (comma separated)</Label>
                        <Input
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Theme Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imageFile && <p className="text-sm text-gray-500 mt-1">{imageFile.name}</p>}
                    </div>
                    <div className="flex gap-4">
                        {form.id ? (
                            <Button onClick={updateStory}>Update</Button>
                        ) : (
                            <Button onClick={saveStory}>Save</Button>
                        )}
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setForm({
                                    id: "",
                                    title: "",
                                    excerpt: "",
                                    content: "",
                                    tags: "",
                                    slug: ""
                                });
                                setImageFile(null);
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-bold mb-4">Stories</h2>
                {loading ? (
                    <p>Loading stories...</p>
                ) : stories.length === 0 ? (
                    <p>No stories yet</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {stories.map((story) => (
                            <Card key={story.id} className="relative">
                                {story.themeImage ? (
                                    <Image
                                        src={story.themeImage}
                                        alt={story.title}
                                        width={400}
                                        height={200}
                                        className="rounded-t-lg object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-t-lg">
                                        <p className="text-gray-500">No image available</p>
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle>{story.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500 mb-2">{story.excerpt}</p>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {story.tags.map((tag, i) => (
                                            <Badge key={i} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => editStory(story)}
                                            variant="secondary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => deleteStory(story.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}