import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function FindUser({ searchInput, selectedOption }) {
  const { user } = useAuth();
  const [results, setResults] = useState(null);

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
    <div>
      <h2>Search Results</h2>
      {results !== null ? (
        <ul>
          <li key={results.id}>
            <p>Username: {results.username}</p>
            <p>Profile Picture: {results.imageURL}</p>
            <p>Genre: {results.genre}</p>
            <p>Instrument: {results.instrument}</p>
            <p>Experience Level: {results.experienceLevel}</p>
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FindUser;
