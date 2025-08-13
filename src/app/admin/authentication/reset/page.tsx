"use client";

import AuthForm from "@/components/AuthForm";

export default function ResetPasswordPage() {
    const handleReset = async (values: any) => {
        const res = await fetch("/api/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.error);
        } else {
            console.log("Rest Link Sent:", data);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <div className="p-6 bg-card shadow-lg rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
                <AuthForm type="reset" onSubmit={handleReset} />
            </div>
        </main>
    );
}
