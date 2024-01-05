function DisplayProfile({ data }) {
  return (
    <div>
      console.log({data.instrument})
      <div className="profile">
        <h1>profile picture</h1>
        <h2>{data.userPhoto}</h2>
      </div>
      <div className="profile">
        <h1>username</h1>
        <h2>{data.username}</h2>
      </div>
      <div className="profile">
        <h1>email</h1>
        <h2>{data.email}</h2>
      </div>
      <div className="profile">
        <h1>instrument</h1>
        <h2>{data.instrument}</h2>
      </div>
      <div className="profile">
        <h1>experience</h1>
        <h2>{data.experience}</h2>
      </div>
      <div className="profile">
        <h1>genre</h1>
        <h2>{data.genre}</h2>
      </div>
    </div>
  );
}

export default DisplayProfile;
