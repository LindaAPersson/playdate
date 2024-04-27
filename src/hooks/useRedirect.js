import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

// Custom hook to handle redirection based on user authentication status
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    // Function to handle redirection
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};