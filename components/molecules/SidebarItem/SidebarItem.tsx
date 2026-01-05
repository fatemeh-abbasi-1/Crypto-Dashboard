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
  onClick,
}) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`w-52 flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
          active ? "bg-purple-500/20 border border-purple-500/50" : "hover:bg-white/5"
        }`}
      >
        <Icon icon={icon} size={20} variant={variant} />
        <Text size="medium" className={active ? "text-purple-300" : ""}>{label}</Text>
      </div>
    </Link>
  );
};
