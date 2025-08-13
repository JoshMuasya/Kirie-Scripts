"use client";

import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  const handleSignup = async (values: any) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
    } else {
      console.log("Signed Up:", data)
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 bg-card shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </main>
  );
}
