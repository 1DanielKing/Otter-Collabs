import { useAuth } from "../contexts/AuthContext";
import React, { useState } from "react";
import FindUser from "../components/FindUsersComponent";

const FindUsers = () => {
  const searchOptions = ["Username", "Song", "Instrument"];
  const [selectedOption, setSelectedOption] = useState(searchOptions[0]);
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const { user } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(`Search by ${selectedOption}: ${searchInput}`);
    await displayResults();
    setShowResults(true);
  };

  const displayResults = async () => {
    if (selectedOption === "Username") {
      await nameSearch();
    }
    // TODO: Add other search options here when functionality is available in the backend
    // if (selectedOption === "Song") {
    //   await songSearch();
    // }
    // if (selectedOption === "Instrument") {
    //   await instrumentSearch();
    // }
  };

  const nameSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/search?username=${searchInput}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResults(data); // Set result as an object directly
      } else {
        setResults(null); // Set results to null on error
        console.error("Failed to load profile data");
      }
    } catch (error) {
      setResults(null); // Set results to null on error
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSearch}>
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
          <button type="submit">Search</button>
        </div>
      </form>
      <div>{showResults && <FindUser results={results} />}</div>
    </div>
  );
};

export default FindUsers;
