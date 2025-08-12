export interface Stories {
    stories: Story[];
}

export interface StoryIndex {
    story: Story;
    index?: number;
}

export interface Author {
    id: string;
    name: string;
    avatarUrl?: string;
    bio?: string;
}

export interface StoryImage {
    url: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
}

export interface Story {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // markdown
    author: Author;
    publishedAt: string; // ISO
    tags: string[];
    featured?: boolean;
    images: StoryImage[];
    ogImage?: string; // open graph image url
}