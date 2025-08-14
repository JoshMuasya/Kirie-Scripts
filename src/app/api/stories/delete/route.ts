import { NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        await deleteDoc(doc(db, "stories", id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting story:", error);
        return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
    }
}
