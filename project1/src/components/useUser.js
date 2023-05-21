import React, { useEffect, useState } from 'react'

export default function useUser() {
    let [user,setUser] = useState({})

    useEffect(()=>{
        if(localStorage.getItem("user") != null){
          setUser(JSON.parse(localStorage.getItem("user")))
        }else{
          localStorage.setItem("user",JSON.stringify(user))
          window.location.reload();
        }

        
    },[])

  return {user,setUser}
}
