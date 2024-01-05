import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NewUser from "./pages/NewUser";
import ProfileCreation from "./pages/ProfileCreation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";

const AuthenticatedApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
};

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<NewUser />} />
      <Route path="/profile-creation" element={<ProfileCreation />} />
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
