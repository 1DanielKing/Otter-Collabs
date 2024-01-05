import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NewUser from "./pages/NewUser";
import ProfileCreation from "./pages/ProfileCreation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";

const AuthenticatedApp = () => {
  const {loading } = useAuth();

  return (
    <Layout>
    {loading ? (
        <p>Loading Sick Beats...</p>
      ) : (
      <Routes>
        <Route path="/" element={<ProfilePage />} />
      </Routes>
      )}
    </Layout>
  );
};

const UnauthenticatedApp = () => {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/"element={<LandingPage user={user} loading={loading}/>}/>
      <Route path="/new-user" element={<NewUser />} />
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
