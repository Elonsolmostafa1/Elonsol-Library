import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

export let UserContext = createContext('')

export default function UserContextProvider(props)
{
    
    const[userData,setUserData] = useState(null);
    
    function decodeUserToken(){
        let encodedToken = localStorage.getItem('userToken');
        let decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken); 
      }


    return <UserContext.Provider value={{userData,setUserData,decodeUserToken}}>{props.children}</UserContext.Provider>
}