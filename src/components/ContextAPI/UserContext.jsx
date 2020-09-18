// import React, { createContext, useState } from "react";
// import { useQuery } from "react-query";
// import { fetchUser } from "../Query/Queries";

// export const UserContext = createContext();

// export const UserProvider = (props) => {
//   const [user, setUser] = useState({});

//   const { data: person, status } = useQuery("user", fetchUser);
//   if (status === "success") {
//     console.log(person.data.message);
//     setUser(person.data.message);
//   }

//   return (
//     <UserContext.Provider value={[user]}>{props.children}</UserContext.Provider>
//   );
// };
