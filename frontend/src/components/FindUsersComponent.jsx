import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FindUser({ results }) {

  return (
    <div>
      <h2>Search Results</h2>
      {Array.isArray(results) ? (
        results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                <Link to={`/user/${result.username}`}>
                  <p>Username: {result.username}</p>
                </Link>
                <p>Profile Picture: {result.imageURL}</p>
                <p>Experience Level: {result.experienceLevel}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No array results found.</p>
        )
      ) : results !== null ? (
        <div>
          <Link to={`/user/${results.username}`}>
            <p>Username: {results.username}</p>
          </Link>
          <p>Profile Picture: {results.imageURL}</p>
          <p>Experience Level: {results.experienceLevel}</p>
        </div>
      ) : (
        <p>No object results found.</p>
      )}
    </div>
  );
}

export default FindUser;
