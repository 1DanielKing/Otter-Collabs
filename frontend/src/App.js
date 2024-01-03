import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NewUser from "./pages/NewUser";
import ProfileCreation from "./pages/ProfileCreation";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<NewUser />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
