"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup" | "reset";
  onSubmit: (values: any) => void;
}

const schemaMap = {
  login: z.object({
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  signup: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  }),
  reset: z.object({
    email: z.string().email({ message: "Valid email is required" }),
  }),
};

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const form = useForm<z.infer<typeof schemaMap[typeof type]>>({
    resolver: zodResolver(schemaMap[type]),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as any,
  });

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit(values) 
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
        {type === "signup" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type !== "reset" && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">
          {type === "login" ? "Login" : type === "signup" ? "Sign Up" : "Reset Password"}
        </Button>

        {type === "login" && (
          <div className="text-center text-sm mt-2">
            <Link href="/admin/authentication/reset" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
