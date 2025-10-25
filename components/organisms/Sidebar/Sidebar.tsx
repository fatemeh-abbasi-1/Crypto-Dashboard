"use client";

import React from "react";
import Image from "next/image";

import { SidebarItem } from "@/components/molecules/SidebarItem/SidebarItem";
import Title from "@/components/atoms/Title/Title";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogin,
  HiOutlineUserAdd,
} from "react-icons/hi";
import Text from "@/components/atoms/Text/Text";

export const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gradient-1 w-[280px] h-screen flex flex-col items-center pt-7">
      <Title variant="h2" className="mb-7">
        VISION UI FREE
      </Title>
      <Image
        src={"./line.svg"}
        alt="line-image"
        width={200}
        height={5}
        className="mb-5"
      />
      <div className="flex flex-col gap-1">
        <SidebarItem
          icon={HiOutlineHome}
          label="Home"
          href="/"
          active
          variant="filled"
        />
        <SidebarItem
          icon={HiOutlineChartBar}
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

      <div className="mt-6 flex flex-col gap-1.5">
        <Text className="ml-6">Account Page</Text>

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
