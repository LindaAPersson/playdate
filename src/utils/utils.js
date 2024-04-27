import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Function to fetch more data for pagination
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// Function to set the token timestamp in local storage
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Function to check if the token should be refreshed based on the token timestamp
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// Function to remove the token timestamp from local storage
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};