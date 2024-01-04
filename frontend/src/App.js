import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NewUser from "./pages/NewUser";
import ProfileCreation from "./pages/ProfileCreation";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<NewUser />} />
            <Route path="/profile-creation" element={<ProfileCreation />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
