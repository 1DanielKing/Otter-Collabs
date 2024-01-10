import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function FindUser({ searchInput, selectedOption }) {
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  const displayResults = async () => {
    if (selectedOption === "Username") {
      await nameSearch();
    }
    // TODO: Add later when functionality is in the backend for the search features
    // if (selectedOption === "Song") {
    //   await songSearch();
    // }
    // if (selectedOption === "Instrument") {
    //   await instrumentSearch();
    // }
  };

  useEffect(() => {
    const displayResults = async () => {
      if (selectedOption === "Username") {
        await nameSearch();
      }
      // Add other search options here when functionality is available in the backend
    };
    console.log("Search Input:", searchInput);
    console.log("Selected Option:", selectedOption);
    displayResults();
  }, [searchInput, selectedOption]);

  const nameSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/search?username=${searchInput}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setResults(data);
        } // Update results state with the fetched data
      } else {
        setResults([]);
        console.error("Failed to load profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // TODO: Implement other search functions similarly

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{/* Render each result item here */}</li>
        ))}
      </ul>
    </div>
  );
}

export default FindUser;
