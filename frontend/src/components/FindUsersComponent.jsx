import { useAuth } from "../contexts/AuthContext";

function FindUser({ searchInput, selectedOption }) {
  const { user } = useAuth();

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
      console.error("Error fetching profile data:", error);
    }
  };

  //todo after making sure name search works and once the backend functionality is there these other functions will be added

  // const songSearch = async () => {
  //   const results = await fetch(`http://localhost:8080/api/recommendations/{searchInput}`)
  // };

  // const instrumentSearch = async () => {
  //   const results = await fetch(`http://localhost:8080/api/recommendations/{searchInput}`)
  // };

  return (
    <div>
      <div></div>
    </div>
  );
}

export default FindUser;
