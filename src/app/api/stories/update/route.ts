import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/firebase";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const id = formData.get("id") as string;
        const updates: any = {};

        ["title", "slug", "excerpt", "content", "tags", "featured", "author"].forEach((key) => {
            if (formData.has(key)) {
                updates[key] = formData.get(key);
                if (key === "tags" || key === "author") {
                    updates[key] = JSON.parse(updates[key]);
                }
            }
        });

        // Update theme image if provided
        if (formData.has("themeImage")) {
            const themeImageFile = formData.get("themeImage") as File;
            const themeRef = ref(storage, `stories/theme/${Date.now()}-${themeImageFile.name}`);
            await uploadBytes(themeRef, themeImageFile);
            updates.themeImage = await getDownloadURL(themeRef);
        }

        // Update other images if provided
        if (formData.has("images")) {
            const images: string[] = [];
            const files = formData.getAll("images") as File[];
            for (const file of files) {
                const imageRef = ref(storage, `stories/images/${Date.now()}-${file.name}`);
                await uploadBytes(imageRef, file);
                const url = await getDownloadURL(imageRef);
                images.push(url);
            }
            updates.images = images;
        }

        const storyRef = doc(db, "stories", id);
        await updateDoc(storyRef, updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating story:", error);
        return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
    }
}
