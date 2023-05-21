import React from 'react'
import { useNavigate,NavLink,Outlet } from 'react-router-dom'
import { useEffect } from 'react'

export default function AdminPermission() {
  const navigate = useNavigate()
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        if (user == null || user.roleId !== 1){
            console.log("no user or not 3 ");
            navigate("/Error")
        }
    },[])
  return (
    <div className='container mt-5'>
        <div className='row mt-5'>
            <div className='col-12'>
                <div className='row'>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission1/ShowUsers">show userList</NavLink>
                    </div>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission1/#"></NavLink>
                    </div>
                </div>
                <Outlet/>
            </div>
            
        </div>
    </div>
  )
}
