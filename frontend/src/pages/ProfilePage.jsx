import { useAuth } from "../contexts/AuthContext";
import DisplayProfile from "../components/DisplayProfile";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    console.log(user);
    return <div>Loading profile...</div>;
  }

  return (
    <div className="main-container">
      <div className="item-box">
        <DisplayProfile data={user} />
      </div>
    </div>
  );
};

export default ProfilePage;

