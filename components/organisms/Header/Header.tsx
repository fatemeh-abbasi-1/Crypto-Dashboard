"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { IoPerson } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";

import { HeaderProps } from "./Header.types";
import Text from "@/components/atoms/Text/Text";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import Button from "@/components/atoms/Button/Button";

const Header: React.FC<HeaderProps> = ({ currentPage, onMenuClick }) => {
  const { data: session } = useSession();

  return (
    <header
      className={clsx(
        "bg-transparent flex flex-col md:flex-row items-start md:items-center justify-between w-full px-4 md:px-6 py-4 md:py-6 shadow-xl gap-4"
      )}
    >
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
          aria-label="Open menu"
        >
          <HiMenu size={24} />
        </button>
        
        <div className="flex flex-col">
          <div className="flex gap-1">
            <Text size="small" color="gray">
              Pages /
            </Text>
            <Text size="small">{currentPage}</Text>
          </div>
          <Text size="medium">{currentPage}</Text>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
        <div className="w-full md:w-auto">
          <SearchBox />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {session ? (
            <>
              <div className="hidden md:flex flex-col items-end">
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
                className="text-xs md:text-sm text-zinc-400 hover:text-white transition"
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
              className="text-xs md:text-sm text-zinc-400 hover:text-white transition"
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
