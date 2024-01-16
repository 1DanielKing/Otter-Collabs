import { UserView, Portfolio } from "../components/ViewOnlyProfile";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ViewUserProfile = ({ location }) => {
  const { username } = useParams();
  useEffect(() => {
    console.log(username);
  }, [username]);
  return (
    <div className="main-container">
      <div className="display-profile-container">
        <UserView data={username} />
        <Portfolio data={username} />
    </div>
  );
};

export default ViewUserProfile;
