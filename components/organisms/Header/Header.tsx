"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import { HeaderProps } from "./Header.types";
import Text from "@/components/atoms/Text/Text";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";

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

        {session?.user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => signOut()}
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              Sign out
            </button>
            <Image
              src={session.user.image || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full border border-purple-500"
            />
          </div>
        ) : (
          <Image
            src="/default-avatar.png"
            alt="Default Avatar"
            width={40}
            height={40}
            className="rounded-full border border-zinc-500 opacity-70"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
