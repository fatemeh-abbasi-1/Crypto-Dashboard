"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const RegisterForm = () => {
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
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Something went wrong");
        return;
      }

      alert("✅ Registered successfully! You can now log in.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Server error, please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-6 bg-transparent"
    >
      <Title>Sign Up</Title>

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

      <Text>
        Already have an account?{" "}
        <Link href="/login" className="text-purple-400">
          Sign In
        </Link>
      </Text>
    </form>
  );
};

export default RegisterForm;
