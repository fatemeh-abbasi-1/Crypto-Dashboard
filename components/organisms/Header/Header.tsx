import React from "react";
import { HeaderProps } from "./Header.types";
import { FiUser, FiSettings, FiBell, FiSearch } from "react-icons/fi";
import clsx from "clsx";

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
        <Text size="small" color="gray">
          Pages / {currentPage}
        </Text>
        <Text size="medium">{currentPage}</Text>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" />
          <input
            type="text"
            placeholder="Type here..."
            className="bg-gradient-2 text-white text-sm pl-9 pr-4 py-1.5 rounded-lg border outline-none focus:ring-1 focus:ring-blue placeholder-gray"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8 text-lg">
          <FiUser />
          <FiSettings />
          <FiBell />
        </div>
      </div>
    </header>
  );
};

export default Header;
