import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProviders";


export const IngredientsProviderContext = createContext();

export function IngredientsProvider(props) {
  const APIKEY = `Token ${process.env.REACT_APP_SUGGESTIC_API_KEY}`;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", APIKEY);
 
  

  
  

  const getRecipesByIngredients = (ingredients, sgUser) => {
    myHeaders.append("sg-user", sgUser);
    const ingredientsString = ingredients.map(i => `"${i}"`).join(',');
    var raw = JSON.stringify({
        query: "{\r\n  searchRecipesByIngredients(\r\n    mustIngredients: ["+ingredientsString+"]\r\n  ) {\r\n    edges {\r\n      node {\r\n        name\r\n        ingredients {\r\n          name\r\n        }\r\n       ingredientLines\r\n      }\r\n    }\r\n  }\r\n}",
        variables: {}
      });
      debugger;
    return fetch("https://production.suggestic.com/graphql", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); 
  }

  return (
    <IngredientsProviderContext.Provider
      value={{
        getRecipesByIngredients
      }}
    >
      {props.children}
    </IngredientsProviderContext.Provider>
  );
}
