import axios from "axios";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");
export const decodedToken = () => {
  console.log(jwt_decode(token));
  return jwt_decode(token);
};
export const fetchChannels = async () => {
  const result = await axios.post(
    "https://banana-crumble-17466.herokuapp.com/channel/all"
  );
  return result;
};

export const fetchMessages = async (key, obj) => {
  const result = await axios.get(
    `https://banana-crumble-17466.herokuapp.com/channel/${obj.id}`
  );
  return result;
};

export const fetchusers = async () => {
  const result = await axios.get(
    "https://banana-crumble-17466.herokuapp.com/users/getall"
  );
  return result;
};

export const fetchUser = async () => {
  const result = await axios.get(
    `https://banana-crumble-17466.herokuapp.com/users/user/${token}`
  );
  return result;
};

export const SignUp = async (values) => {
  const result = await axios.post(
    `https://banana-crumble-17466.herokuapp.com/users`,
    values
  );
  return result;
};

export const SignIn = async (values) => {
  const result = await axios.post(
    `https://banana-crumble-17466.herokuapp.com/auth`,
    values
  );
  return result;
};

export const delMessage = async (key, obj) => {
  const result = await axios.delete(
    `https://banana-crumble-17466.herokuapp.com/message/${key.id}`
  );
  return result;
};
