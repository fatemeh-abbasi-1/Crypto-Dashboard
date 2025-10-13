// src/components/organisms/Header/Header.tsx
import React from "react";
import { HeaderProps } from "./Header.types";
import { FiUser, FiSettings, FiBell, FiSearch } from "react-icons/fi";
import clsx from "clsx";
import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header
      className={clsx(
        "bg-transparent flex items-center justify-between w-full px-6 py-6"
      )}
    >
      {/* Left section */}
      <div className="flex flex-col">
        <Text size="small" className="text-gray-400">
          Pages / {currentPage}
        </Text>
        <Text size="medium">{currentPage}</Text>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Type here..."
            className="bg-[#0d1b3d] text-white text-sm pl-9 pr-4 py-1.5 rounded-lg border border-blue-800/40 outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8 text-gray-300 text-lg">
          <FiUser className="cursor-pointer hover:text-white transition" />
          <FiSettings className="cursor-pointer hover:text-white transition" />
          <FiBell className="cursor-pointer hover:text-white transition" />
        </div>
      </div>
    </header>
  );
};

export default Header;
