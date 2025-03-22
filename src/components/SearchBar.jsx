import React from "react";
import { Search } from "lucide-react"; // Import correct de l'icône

const SearchBar = ({ searchTerm, setSearchTerm, className }) => {
  return (
    <div className={`flex ml-14 items-center w-[303px] h-[52px] bg-white rounded-[10px] px-4 shadow-md border border-gray-300 ${className}`}>
      <Search className="text-[#6DC6A2] w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-2 focus:outline-none text-gray-700 bg-transparent"
      />
    </div>
  );
};


export default SearchBar;

