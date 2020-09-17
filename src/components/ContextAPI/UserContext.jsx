import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchusers();
  }, []);
  const fetchUser = () => {
    axios
      .get(`https://banana-crumble-17466.herokuapp.com/users/user/${token}`)
      .then((res) => {
        console.log(res);
        setUser(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchusers = () => {
    axios
      .get("https://banana-crumble-17466.herokuapp.com/users/getall")
      .then((res) => {
        console.log(res.data.message);
        setUsers(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider value={[user, users]}>
      {props.children}
    </UserContext.Provider>
  );
};
