import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar({ title, loggedInUser, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="mr-20 text-2xl font-bold text-red-600 hover:text-red-800">
          {title}
        </Link>

        <div className="hidden md:flex items-center border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow bg-transparent outline-none placeholder-gray-500"
          />
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>

        <div className="relative">
          {loggedInUser ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center border gap-2 border-gray-300 rounded-full py-2 px-4">
              <FontAwesomeIcon icon={faUser} />
                <span className="text-red-700 "><strong>{loggedInUser.name}</strong></span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-300 shadow-lg z-10">
                  <button onClick={() => { onLogout(); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 transition-colors duration-200">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center border gap-2 border-gray-300 rounded-full py-2 px-4">
                <FontAwesomeIcon icon={faUser} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-300 shadow-lg z-10">
                  <Link to="/login" onClick={handleLinkClick} className="block px-4 py-2 text-gray-700 hover:bg-red-100 transition-colors duration-200 border-b border-gray-300 last:border-b-0">Login</Link>
                  <Link to="/register" onClick={handleLinkClick} className="block px-4 py-2 text-gray-700 hover:bg-red-100 transition-colors duration-200">Sign Up</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
