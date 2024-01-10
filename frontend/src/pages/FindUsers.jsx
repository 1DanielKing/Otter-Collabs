import { useAuth } from "../contexts/AuthContext";
import "./ProfilePage.css";
import FindUser from "../components/FindUsersComponent";
import React, { useState } from "react";

const FindUsers = () => {
  const searchOptions = ["Username", "Song", "Instrument"];
  const [selectedOption, setSelectedOption] = useState(searchOptions[0]);
  const [searchInput, setSearchInput] = useState("");

  const { user } = useAuth();

  const handleSearch = () => {
    console.log(`Search by ${selectedOption}: ${searchInput}`);
  };

  return (
    <div className="main-container">
      <div>
        <label htmlFor="searchBy">Search by:</label>
        <select
          id="searchBy"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {searchOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {/* Render the FindUser component with props */}
        <FindUser searchInput={searchInput} selectedOption={selectedOption} />
      </div>
    </div>
  );
};

export default FindUsers;
