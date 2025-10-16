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
    <aside className="bg-gradient-1 w-[264px] h-screen flex flex-col justify-between items-center pt-7">
      <div>
        <Title variant="h2" className="mb-6">
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
            label="Dashboard"
            href="/dashboard"
            active
            variant="filled"
          />
          <SidebarItem icon={HiOutlineChartBar} label="Tables" href="/tables" />
          <SidebarItem
            icon={HiOutlineCreditCard}
            label="Billing"
            href="/billing"
            variant="filled"
          />
          <SidebarItem icon={HiOutlineCog} label="RTL" href="/rtl" />
        </div>

        <div className="mt-6 flex flex-col gap-1.5">
          <Text className="ml-6">Account Page</Text>

          <SidebarItem icon={HiOutlineUser} label="Profile" href="/profile" />
          <SidebarItem icon={HiOutlineLogin} label="Sign In" href="/signin" />
          <SidebarItem icon={HiOutlineUserAdd} label="Sign Up" href="/signup" />
        </div>
      </div>
    </aside>
  );
};
