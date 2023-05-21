import React, { useState } from 'react'

export default function useLogState() {
    const [logState,setLogState] = useState("flex");
    const [logoutState,setLogoutState] = useState("none");

    function handleChangeLogState(){
        if(logState == "flex"){
            setLogState("none");
            setLogoutState("flex");
        }else {
            setLogState("flex");
            setLogoutState("none");
        }
    }

  return {logState,logoutState,handleChangeLogState}
}
