"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";

import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import Spinner from "@/components/atoms/Spinner/Spinner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch portfolio for total assets
  const { data: portfolioData } = useSWR(
    status === "authenticated" ? "/api/portfolio" : null,
    fetcher
  );

  // Fetch coin prices for calculation
  const { data: coinsData } = useSWR(
    portfolioData?.portfolio?.length > 0 ? "/api/coins?page=1&per_page=100" : null,
    fetcher
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchUser();
    }
  }, [status, router]);

  // Calculate total assets value
  useEffect(() => {
    if (portfolioData?.portfolio && coinsData) {
      let total = 0;
      portfolioData.portfolio.forEach((item: any) => {
        const coin = coinsData.find(
          (c: any) => c.id === item.coinId || c.symbol.toLowerCase() === item.coinSymbol.toLowerCase()
        );
        if (coin && item.amount > 0) {
          total += item.amount * coin.current_price;
        }
      });
      setTotalAssets(total);
    } else {
      setTotalAssets(0);
    }
  }, [portfolioData, coinsData]);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        reset({
          name: data.user.name,
          email: data.user.email,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMessage = typeof result.error === 'string' 
          ? result.error 
          : result.error?.email?.[0] || result.error?.name?.[0] || "Failed to update profile";
        setMessage({ type: "error", text: errorMessage });
        return;
      }

      setUser(result.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
      
      // Update session
      await update();
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return <Spinner />;
  }

  if (status === "unauthenticated" || !user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-6 max-w-2xl">
      <Title variant="h1">Profile</Title>

      <div className="bg-neutral-700 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-6 mb-8">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full border-2 border-purple-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <Title variant="h2">{user.name}</Title>
            <Text className="text-gray-400">{user.email}</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="w-auto px-4"
            size="small"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* User Information Display */}
        <div className="mb-8 space-y-4">
          <div className="p-4 bg-neutral-800 rounded-lg">
            <Text className="text-sm text-gray-400 mb-1">Total Assets Value</Text>
            <Title variant="h3" className="text-2xl text-purple-400">
              ${totalAssets.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Title>
          </div>
        </div>

        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div>
              <Input
                type="text"
                label="Name"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            <div>
              <Input
                type="email"
                label="Email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-500/20 border border-green-500/50"
                    : "bg-red-500/20 border border-red-500/50"
                }`}
              >
                <Text
                  className={
                    message.type === "success" ? "text-green-400" : "text-red-400"
                  }
                >
                  {message.text}
                </Text>
              </div>
            )}

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        )}

        {!isEditing && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-800 rounded-lg">
              <Text className="text-sm text-gray-400 mb-1">Name</Text>
              <Text className="text-lg">{user.name}</Text>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg">
              <Text className="text-sm text-gray-400 mb-1">Email</Text>
              <Text className="text-lg">{user.email}</Text>
            </div>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-neutral-600">
          <Text className="text-sm text-gray-400">
            <strong>Note:</strong> Changing your email will require you to verify
            the new email address. Profile picture can only be changed through
            OAuth providers.
          </Text>
        </div>
      </div>
    </div>
  );
}


