import { db } from "@/lib/firebase/firebase";
import { adminAuth, adminFirestore, storage, timeStamp } from "@/lib/firebase/firebase-admin";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

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

// DELETE: Delete a story
export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const idToken = authHeader.split("Bearer")[1]

  try {
    await adminAuth.verifyIdToken(idToken)

    const { slug } = params;
    const storyRef = doc(db, "stories", slug);
    await deleteDoc(storyRef);

    return NextResponse.json({ message: "Story deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting story:", error);
    return NextResponse.json(
      { error: "Failed to delete story" },
      { status: 500 }
    );
  }
}

// GET: Get specific Story
export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // Query Firestore for the matching slug
    const querySnapshot = await adminFirestore
      .collection("stories")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    console.log("snapshot", querySnapshot)

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Convert publishedAt to ISO string if it exists
    const publishedAt =
      data.publishedAt?.toDate()
        ? data.publishedAt.toDate().toISOString()
        : null;

    return NextResponse.json({
      id: doc.id,
      ...data,
      publishedAt,
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const idToken = authHeader.replace("Bearer ", "").trim();

  if (!idToken) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }

  try {
    await adminAuth.verifyIdToken(idToken)

    const { slug } = await context.params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid or missing slug" }, { status: 400 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const publishedAt = formData.get("publishedAt") as string | null;
    const themeImage = formData.get("themeImage") as File | null;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    let parsedPublishedAt = null;
    if (publishedAt) {
      const date = new Date(publishedAt);
      if (isNaN(date.getTime())) {
        return NextResponse.json({ error: "Invalid publishedAt date" }, { status: 400 });
      }
      parsedPublishedAt = timeStamp.fromDate(date);
    }

    const querySnapshot = await adminFirestore
      .collection("stories")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const docRef = querySnapshot.docs[0].ref;

    const updateData: any = {
      title,
      content,
      excerpt,
      ...(parsedPublishedAt && { publishedAt: parsedPublishedAt }),
      updatedAt: timeStamp.now(),
    };

    if (themeImage) {
      const bucket = storage.bucket();
      const fileName = `stories/${Date.now()}-${themeImage.name}`;
      const file = bucket.file(fileName);

      // Convert to buffer
      const arrayBuffer = await themeImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to storage
      await file.save(buffer, {
        contentType: themeImage.type,
        public: true,
      });

      // Make public & get URL
      await file.makePublic();
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      updateData.themeImage = imageUrl;
    }


    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data();

    return NextResponse.json({
      id: updatedDoc.id,
      ...updatedData,
      publishedAt: updatedData?.publishedAt?.toDate?.()?.toISOString() ?? null,
    });
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}
