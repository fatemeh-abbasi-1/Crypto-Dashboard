"use client";

import React from "react";
import Image from "next/image";

import { SidebarItem } from "@/components/molecules/SidebarItem/SidebarItem";
import Title from "@/components/atoms/Title/Title";
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogin,
  HiOutlineUserAdd,
} from "react-icons/hi";
import { BsCoin } from "react-icons/bs";

import Text from "@/components/atoms/Text/Text";

export const Sidebar: React.FC = () => {
  return (
    <aside className="bg-neutral-900 w-[300px] h-screen flex flex-col gap-6 items-center pt-8 shadow-2xl">
      <Title variant="h2">VISION UI FREE</Title>
      <Image src={"./line.svg"} alt="line-image" width={200} height={5} />
      <div className="flex flex-col gap-2 w-56 ">
        <SidebarItem
          icon={HiOutlineHome}
          label="Home"
          href="/"
          active
          variant="filled"
        />
        <SidebarItem
          icon={BsCoin}
          label="Coins"
          href="/coins"
          variant="filled"
        />
        <SidebarItem
          icon={HiOutlineCreditCard}
          label="Billing"
          href="/billing"
          variant="filled"
        />
        <SidebarItem
          icon={HiOutlineCog}
          label="RTL"
          href="/rtl"
          variant="filled"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Text className="ml-5" size="medium">
          ACCOUNT PAGE
        </Text>

        <SidebarItem
          icon={HiOutlineUser}
          label="Profile"
          href="/profile"
          variant="filled"
        />
        <SidebarItem
          icon={HiOutlineLogin}
          label="Sign In"
          href="/signin"
          variant="filled"
        />
        <SidebarItem
          icon={HiOutlineUserAdd}
          label="Sign Up"
          href="/signup"
          variant="filled"
        />
      </div>
    </aside>
  );
};
