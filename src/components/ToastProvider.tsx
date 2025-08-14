
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1e1e2f", // Dark background
          color: "#fff",
          border: "1px solid #6A0DAD", // Purple border
        },
        success: {
          style: {
            background: "#6A0DAD",
            color: "#FFD700",
            fontWeight: "bold",
          },
          iconTheme: {
            primary: "#FFD700",
            secondary: "#6A0DAD",
          },
        },
        error: {
          style: {
            background: "#FFD700",
            color: "#6A0DAD",
            fontWeight: "bold",
          },
          iconTheme: {
            primary: "#6A0DAD",
            secondary: "#FFD700",
          },
        },
      }}
    />
  );
}
