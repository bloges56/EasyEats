import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const [userProfile, setUserProfile] = useState(
    localStorage.getItem("userProfile")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [userId, setUserId] = useState();

  const APIKEY = `Token ${process.env.REACT_APP_SUGGESTIC_API_KEY}`;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const login = (email, pw) => {
    return fetch("https://production.suggestic.com/api/v1/login", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: email,
        password: pw,
      }),
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((data) => {
        debugger;
        localStorage.setItem("userProfile", data["name"]);
        setIsLoggedIn(true);
        setUserId(data["user_id"]);
      })
      .catch((error) => console.log("error", error));
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  

  const register = (name, email, password) => {
    myHeaders.append("Authorization", APIKEY);
    return fetch("https://production.suggestic.com/graphql", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        query: `mutation {createUser(name: \"${name}\"email: \"${email}\" password: \"${password}\" program: \"01bbd541-939b-4b85-8d90-48ff0b02d0ee\" restrictions: [ \"UmVzdHJpY3Rpb246M2ZmZDQ1OGUtMjczZi00MTZmLWE5NjYtNmFkYzliYjQ3OWE1\"]) {success message user {id databaseId profileId name}}}`,
      }),
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((data) => {
        debugger;
        localStorage.setItem("userProfile", name);
        setIsLoggedIn(true);
        setUserId(data["user_id"]);
      })
      .catch((error) => console.log("error", error));
  };

 


 

  const saveUser = (userProfile) => {
    myHeaders.append("Authorization", process.env.SUGGESTIC_API_KEY);
    myHeaders.append("Accept-Encoding", "gzip, deflate, br");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("DNT", "1");
    myHeaders.append("Origin", "https://production.suggestic.com");
    myHeaders.append("sg-user", userId);
    if(isLoggedIn)
    {
        return fetch("https://production.suggestic.com/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "query": `mutation {\n  updateProfile(${JSON.stringify(userProfile)}) {\n    success\n    errors {\n      field\n    }\n  }\n}`
              }),
            redirect: 'follow'
          })
        .then(response => response.json())
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        register,
        saveUser
      }}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
}
