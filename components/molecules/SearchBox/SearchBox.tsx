import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600" />
      <input
        type="text"
        placeholder="Type here..."
        className="bg-transparent text-gray-100 text-sm px-9 py-1.5 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none placeholder-gray"
      />
    </div>
  );
};

export default SearchBox;
