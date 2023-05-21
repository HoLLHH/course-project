import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export default function Error() {
    const [error,setError] =useState("")

    useEffect(()=>{
      let user = localStorage.getItem("user")
      if (user === "{}") {
        setError("You are not logged in!")
      }else {
        setError("You have no right to do this!")
      }
      
    })

  return (
    <div className='container mt-5'>
      <div className= ' row mt-5'>
        <div className='col-12'>
          <h2 className='mt-5' style={{color:"red"}}>error:</h2>
          <h2 style={{color:"red"}}>{error}</h2>
        </div>
      
      </div>
        
    </div>
  )
}
