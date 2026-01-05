"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiX } from "react-icons/hi";

import { SidebarItem } from "@/components/molecules/SidebarItem/SidebarItem";
import Title from "@/components/atoms/Title/Title";
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineUser,
  HiOutlineChartBar,
} from "react-icons/hi";
import { BsCoin } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import Text from "@/components/atoms/Text/Text";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          bg-neutral-800 w-[280px] md:w-[300px] 
          h-screen 
          flex flex-col gap-4 md:gap-6 items-center pt-4 md:pt-8 
          shadow-2xl overflow-y-auto
          z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <HiX size={24} />
        </button>

        <Title variant="h2" className="text-lg md:text-xl">VISION UI FREE</Title>
        <Image src={"./line.svg"} alt="line-image" width={200} height={5} className="hidden md:block" />
        <div className="flex flex-col gap-2 w-full md:w-56 px-4 md:px-0">
          <SidebarItem
            icon={HiOutlineHome}
            label="Home"
            href="/"
            active={pathname === "/"}
            variant="filled"
            onClick={onClose}
          />
          <SidebarItem
            icon={BsCoin}
            label="Coins"
            href="/coins"
            active={pathname === "/coins"}
            variant="filled"
            onClick={onClose}
          />
          <SidebarItem
            icon={MdOutlineAccountBalanceWallet}
            label="Portfolio"
            href="/portfolio"
            active={pathname === "/portfolio"}
            variant="filled"
            onClick={onClose}
          />
          <SidebarItem
            icon={HiOutlineChartBar}
            label="Activities"
            href="/activities"
            active={pathname === "/activities"}
            variant="filled"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-56 px-4 md:px-0">
          <Text className="ml-5 hidden md:block" size="medium">
            ACCOUNT PAGE
          </Text>

          <SidebarItem
            icon={HiOutlineUser}
            label="Profile"
            href="/profile"
            active={pathname === "/profile"}
            variant="filled"
            onClick={onClose}
          />
        </div>
      </aside>
    </>
  );
};
