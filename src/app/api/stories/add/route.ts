import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/firebase";
import { adminAuth } from "@/lib/firebase/firebase-admin";

export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer")) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    const idToken = authHeader.replace("Bearer ", "").trim();

    try {
        await adminAuth.verifyIdToken(idToken)
        
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const tags = JSON.parse(formData.get("tags") as string);
        const featured = formData.get("featured") === "true";

        // Upload theme image
        const themeImageFile = formData.get("themeImage") as File;
        let themeImageUrl = "";
        if (themeImageFile) {
            const themeRef = ref(storage, `stories/theme/${Date.now()}-${themeImageFile.name}`);
            await uploadBytes(themeRef, themeImageFile);
            themeImageUrl = await getDownloadURL(themeRef);
        }

        // Upload other images
        const images: string[] = [];
        const files = formData.getAll("images") as File[];
        for (const file of files) {
            const imageRef = ref(storage, `stories/images/${Date.now()}-${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            images.push(url);
        }

        // Save story in Firestore
        const storyRef = await addDoc(collection(db, "stories"), {
            title,
            slug,
            excerpt,
            content,
            tags,
            featured,
            themeImage: themeImageUrl,
            images,
            publishedAt: serverTimestamp()
        });

        return NextResponse.json({ id: storyRef.id, success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add story" }, { status: 500 });
    }
}
