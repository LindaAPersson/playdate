import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Create context for current user and set current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to access current user and set current user contexts
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component to manage current user state
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    // Function to fetch current user data on component mount
    const handleMount = async () => {
        try {
            const { data } = await axios.get("dj-rest-auth/user/");
            setCurrentUser(data);
        } catch (err) {
            //console.log(err);
        }
    };

    // Effect to fetch current user data on component mount
    useEffect(() => {
        handleMount();
    }, []);

    // Memoized callback function to handle token refresh
    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                      await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                      setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                          history.push("/signin");
                        }
                        return null;
                      });
                      removeTokenTimestamp();
                      return config;
                    }
                  }
                  return config;
                },
                (err) => {
                  return Promise.reject(err);
                }
              );

        // Interceptor to handle token refresh for axios responses
        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    try {
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push("/signin");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [history]);


    return (
        // Provide current user and set current user contexts to children components
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};