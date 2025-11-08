"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      redirect: false, // جلوگیری از ریدایرکت خودکار
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      alert("❌ Invalid email or password");
    } else {
      // ✅ بعد از لاگین موفق، برو به صفحه اصلی
      window.location.href = "/";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-6 bg-transparent"
    >
      <Title>Sign In</Title>

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
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <Text>
        Don’t have an account?{" "}
        <Link href="/register" className="text-purple-400">
          Sign Up
        </Link>
      </Text>
    </form>
  );
};

export default LoginForm;
