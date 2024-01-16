import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NewUser from "./pages/NewUser";
import ProfileCreation from "./pages/ProfileCreation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";

import LandingPage from "./pages/LandingPage";

import AudioPortfolio from "./pages/AudioPortfolio";
import AudioUpload from "./pages/AudioUpload";
import SignIn from "./pages/SignIn";
import FindUsers from "./pages/FindUsers";
import ViewUserProfile from "./pages/ViewUserProfile";

const AuthenticatedApp = () => {
  const { loading } = useAuth();

  return (
    <Layout>
      {loading ? (
        <p>Loading Sick Beats...</p>
      ) : (
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/portfolio" element={<AudioPortfolio />} />
          <Route path="/portfolio/upload" element={<AudioUpload />} />
          <Route path="/findUsers" element={<FindUsers />} />
          <Route path="/user/:username" element={<ViewUserProfile />} />
        </Routes>
      )}
    </Layout>
  );
};

const UnauthenticatedApp = () => {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} loading={loading} />} />
      <Route path="/new-user" element={<NewUser />} />
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
