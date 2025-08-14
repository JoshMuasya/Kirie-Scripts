import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET: Fetch all stories
export async function GET() {
  try {
    const storiesRef = collection(db, "stories");
    const snapshot = await getDocs(storiesRef);

    const stories = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      slug: doc.data().slug,
      excerpt: doc.data().excerpt,
      content: doc.data().content,
      tags: doc.data().tags || [],
      themeImage: doc.data().themeImage || "",
      publishedAt:doc.data().publishedAt,
    }));

    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}