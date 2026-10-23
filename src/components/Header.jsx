import React from "react";

const Header = React.memo(function Header({ searchQuery, onSearchChange }) {
  // for demonstration purpose
  console.log("Header Rendered");

  return (
    <header className="bg-white shadow-md py-6 px-4 mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-blue-600">Photo Gallery</h1>
        <input
          type="text"
          placeholder="Search by author name..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </header>
  );
});

export default Header;
