"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { IoPerson } from "react-icons/io5";

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
              <div className="flex flex-col items-end">
                {session.user?.name && (
                  <Text size="small" className="text-white">
                    {session.user.name}
                  </Text>
                )}
                <Text size="small" className="text-zinc-400">
                  {session.user?.email}
                </Text>
              </div>

              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-zinc-400 hover:text-white transition"
                size="small"
              >
                Sign out
              </Button>

              {session.user?.image ? (
                <Image
                  alt="User Avatar"
                  width={40}
                  height={40}
                  src={session.user.image}
                  className="rounded-full border border-purple-500"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 bg-zinc-800">
                  <IoPerson size={22} />
                </div>
              )}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
