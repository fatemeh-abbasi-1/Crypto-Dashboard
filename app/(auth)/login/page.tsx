"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/organisms/LoginForm/LoginForm";
import Text from "@/components/atoms/Text/Text";

const page = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="w-96">
      {error === "OAuthCallback" && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <Text className="text-red-400 text-sm">
            ❌ خطا در لاگین با Google! لطفاً مطمئن شوید که:
            <br />
            1. Client ID و Secret در .env درست هستند
            <br />
            2. Redirect URI در Google Console دقیقاً این است:
            <br />
            <code className="bg-black/30 px-2 py-1 rounded">
              http://localhost:3000/api/auth/callback/google
            </code>
            <br />
            3. ایمیلی که استفاده می‌کنید در Test users اضافه شده
          </Text>
        </div>
      )}
      <LoginForm />
    </div>
  );
};

export default page;
