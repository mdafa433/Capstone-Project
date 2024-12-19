import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

 function Navbar() {
  const [query, setQuery] = useState(""); 
  const navigate = useNavigate(); 
  const handleSearch = (e) => {e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <Link to="/LatestNews">Berita Terbaru</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/indonesia" className="text-white hover:bg-white hover:text-black px-4 py-2 rounded-md">
            Indonesia
          </Link>
          <Link to="/programming" className="text-white hover:bg-white hover:text-black px-4 py-2 rounded-md">
            Programming
          </Link>
          <Link to="/Covid" className="text-white hover:bg-white hover:text-black px-4 py-2 rounded-md">
            Covid-19
          </Link>
          <Link to="/saved" className="text-white hover:bg-white hover:text-black px-4 py-2 rounded-md">
            Saved
          </Link>
        </div>

        
        <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            className="p-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" className="bg-black text-white hover:bg-red-500 px-4 py-2 rounded-r-md">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar