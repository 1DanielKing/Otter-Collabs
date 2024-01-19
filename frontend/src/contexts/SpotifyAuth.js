import { client_Secret, client_Id, redirect_Uri } from "../contexts/SpotifyId";

const HandleCallback = async (location, navigate) => {
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  if (state === null) {
    console.error("State mismatch");
    navigate("/");
    return;
  }

  const clientId = client_Id();
  const client_secret = client_Secret();
  const redirect_uri = redirect_Uri();

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${client_secret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  };

  try {
    const response = await fetch(tokenUrl, authOptions);
    const data = await response.json();

    console.log("Token data:", data);

    navigate("/");
  } catch (error) {
    console.error("Error fetching access token:", error);
    navigate("/");
  }
};

const SpotifyAuth = () => {
  const handleLogin = () => {
    const client_id = client_Id();
    const redirect_uri = redirect_Uri();
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email";

    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
      {
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
        state,
      }
    )}`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export { HandleCallback, SpotifyAuth };
