"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/coins?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-auto">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600" />
      <input
        type="text"
        placeholder="Search coins..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent text-gray-100 text-sm px-9 py-1.5 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none placeholder-gray w-full md:w-auto min-w-[200px]"
      />
    </form>
  );
};

export default SearchBox;
