import axios from "axios";

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
