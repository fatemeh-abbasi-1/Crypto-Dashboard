"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import { HeaderProps } from "./Header.types";
import Text from "@/components/atoms/Text/Text";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import Button from "@/components/atoms/Button/Button";

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const { data: session } = useSession();

  return (
    <header
      className={clsx(
        "bg-transparent flex items-center justify-between w-full px-6 py-6 shadow-xl"
      )}
    >
      <div className="flex flex-col">
        <div className="flex gap-1">
          <Text size="small" color="gray">
            Pages /
          </Text>
          <Text size="small">{currentPage}</Text>
        </div>
        <Text size="medium">{currentPage}</Text>
      </div>

      <div className="flex items-center gap-4">
        <SearchBox />

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Text size="small">{session.user?.email}</Text>
              <Button
                onClick={() => signOut({ callbackUrl: "/login" })} // ✅ بعد از خروج به login برگرد
                className="text-sm text-zinc-400 hover:text-white transition"
                size="small"
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => (window.location.href = "/login")}
              className="text-sm text-zinc-400 hover:text-white transition"
              size="small"
            >
              Sign in
            </Button>
          )}

          <Image
            alt="User Avatar"
            width={40}
            height={40}
            src="/avatar.png"
            className="rounded-full border border-purple-500"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
