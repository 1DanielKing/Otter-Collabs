import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NewUser from "./pages/NewUser";
import ProfileCreation from "./pages/ProfileCreation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import AudioPortfolio from "./pages/AudioPortfolio";
import AudioUpload from "./pages/AudioUpload";
import SignIn from "./pages/SignIn";

const AuthenticatedApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/portfolio" element={<AudioPortfolio />} />
        <Route path="/portfolio/upload" element={<AudioUpload />} />
      </Routes>
    </Layout>
  );
};

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<NewUser />} />
      <Route path="/profile-creation" element={<ProfileCreation />} />
      <Route path="/sign-in" element={<SignIn />} />

    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

const MainApp = () => {
  const { user } = useAuth();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
