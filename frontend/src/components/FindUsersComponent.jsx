import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function FindUser({ results }) {
  const { user } = useAuth();

  return (
    <div>
      <h2>Search Results</h2>
      {Array.isArray(results) ? (
        results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                <p>Username: {result.username}</p>
                <p>Profile Picture: {result.imageURL}</p>
                <p>Genre: {result.genre}</p>
                <p>Instrument: {result.instrument}</p>
                <p>Experience Level: {result.experienceLevel}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No array results found.</p>
        )
      ) : // Assuming results is an object
      results !== null ? (
        <div>
          <p>Username: {results.username}</p>
          <p>Profile Picture: {results.imageURL}</p>
          <p>Genre: {results.genre}</p>
          <p>Instrument: {results.instrument}</p>
          <p>Experience Level: {results.experienceLevel}</p>
        </div>
      ) : (
        <p>No object results found.</p>
      )}
    </div>
  );
}

export default FindUser;
