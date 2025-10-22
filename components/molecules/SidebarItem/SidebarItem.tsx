"use client";

import React from "react";
import Link from "next/link";

import { Icon } from "@/components/atoms/Icon/Icon";
import Text from "@/components/atoms/Text/Text";


import { SidebarItemProps } from "./SidebarItem.types";

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active = false,
  variant = "default",
}) => {
  return (
    <Link href={href}>
      <div
        className={`w-52 flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
          active ? "bg-white/10" : "hover:bg-white/5"
        }`}
      >
        <Icon icon={icon} size={20} variant={variant} />
        <Text size="medium">{label}</Text>
      </div>
    </Link>
  );
};
