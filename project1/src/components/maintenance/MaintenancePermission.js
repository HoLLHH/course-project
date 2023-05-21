import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function MaintenancePermission() {
  const navigate = useNavigate()
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        if (user === null || user.roleId !== 2){
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
                        <NavLink className="nav-link" to="/Permission2/ApplyList">Apply List</NavLink>
                    </div>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission2/NotFinishRepairs">NotFinishRepairs</NavLink>
                    </div>
                </div>
                <Outlet/>
            </div>
            
        </div>
    </div>
  )
}
