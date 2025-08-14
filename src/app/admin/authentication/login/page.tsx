"use client";

import AuthForm from "@/components/AuthForm";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter()

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast.success("Login Successful!!!");
            router.push("/admin");
        } catch (err: any) {
            toast.error(err.message || "Failed to login");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <div className="p-6 bg-card shadow-lg rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6">Login</h1>
                <AuthForm type="login" onSubmit={handleLogin} />
            </div>
        </main>
    );
}
