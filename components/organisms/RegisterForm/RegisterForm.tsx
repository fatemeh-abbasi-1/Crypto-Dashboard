
"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        const errorMessage = typeof result.error === 'string' 
          ? result.error 
          : result.error?.email?.[0] || result.error?.password?.[0] || result.error?.name?.[0] || "Something went wrong";
        alert(`❌ ${errorMessage}`);
        return;
      }
      
      alert("✅ Registered successfully! Redirecting to login...");
      window.location.href = "/login";
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Server error. Please try again.");
    }
  };

  // -------------------------------
  // تابعی که با کلیک روی Google اجرا می‌شود
  const handleGoogle = async () => {
    // redirect: true (پیش‌فرض) باعث میشه NextAuth کاربری را بفرستد به Google و بعد از لاگین redirect انجام شود.
    // می‌تونیم callbackUrl بفرستیم تا بعد از لاگین برگرده به "/" یا هر صفحه‌ای.
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-transparent">
      <Title>Sign Up</Title>

      <Button onClick={handleGoogle} className="mb-2" size="large">
        Continue with Google
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          type="text"
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          type="text"
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Sign Up"}
        </Button>
      </form>

      <Text>
        Already have an account? <Link href="/login"> Sign In</Link>
      </Text>
    </div>
  );
};

export default RegisterForm;
