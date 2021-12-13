import axios from "../../utils/axios";

export const getUser = () => {
  return {
    type: "GET_USER",
    payload: axios.get("user"),
  };
};

export const updateProfile = (data) => {
  return {
    type: "UPDATE_USER_PROFILE",
    payload: axios.patch("user", data),
  };
};

export const updateImage = (data) => {
  return {
    type: "UPDATE_USER_IMAGE",
    payload: axios.patch("user/update-image", data),
  };
};

export const updatePassword = (data) => {
  return {
    type: "UPDATE_USER_PASSWORD",
    payload: axios.patch("user/update-password", data),
  };
};
