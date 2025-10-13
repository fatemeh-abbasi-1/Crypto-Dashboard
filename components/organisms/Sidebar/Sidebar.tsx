// src/components/organisms/Sidebar.tsx
"use client";

import React from "react";
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
    <aside className="w-[264px] h-screen bg-primary flex flex-col justify-between px-4 py-6">
      {/* Header */}
      <div>
        
        <Title variant="h2" className="text-white mb-6"> VISION UI FREE</Title>
        <hr className="text-white mb-5" />
        <div className="flex flex-col gap-1">
          <SidebarItem
            icon={HiOutlineHome}
            label="Dashboard"
            href="/dashboard"
            active
          />
          <SidebarItem icon={HiOutlineChartBar} label="Tables" href="/tables" />
          <SidebarItem
            icon={HiOutlineCreditCard}
            label="Billing"
            href="/billing"
          />
          <SidebarItem icon={HiOutlineCog} label="RTL" href="/rtl" />
        </div>

        <div className="mt-6">
          <Text>Account Page</Text>

          <div className="flex flex-col gap-1">
            <SidebarItem icon={HiOutlineUser} label="Profile" href="/profile" />
            <SidebarItem icon={HiOutlineLogin} label="Sign In" href="/signin" />
            <SidebarItem
              icon={HiOutlineUserAdd}
              label="Sign Up"
              href="/signup"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
