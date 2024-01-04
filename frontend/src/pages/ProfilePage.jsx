import { useAuth } from "../contexts/AuthContext";
import DisplayProfile from "../components/DisplayProfile";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div id="items-container">
      <div className="item-box">
        <DisplayProfile data={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
