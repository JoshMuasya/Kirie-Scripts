"use client";

import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
    const handleLogin = async (values: any) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.error);
        } else {
            console.log("Logged in:", data);
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
