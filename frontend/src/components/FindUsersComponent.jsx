import { useAuth } from "../contexts/AuthContext";

function FindUser({ searchInput, selectedOption }) {
  const { user } = useAuth();
  const [results, setResults] = useState(null);

  const displayResults = () => {
    if (selectedOption === "Username") {
      nameSearch();
    }
    //todo add later when functionality is in the backend for the search features
    // if (selectedOption === "Song") {
    //   songSearch();
    // }
    // if (selectedOption === "Instrument") {
    //   instrumentSearch();
    // }
  };

  const nameSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/recommendations/${searchInput}`
      );
      if (response.ok) {
        const results = await response.json();
      } else {
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
