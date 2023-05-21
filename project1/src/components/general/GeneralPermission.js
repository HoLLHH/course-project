import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function GeneralPermission() {
    const navigate = useNavigate()
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        if (user === null || user.roleId !== 3){
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
                        <NavLink className="nav-link" to="/Permission3/GeneralApply">Apply</NavLink>
                    </div>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission3/MyApply">MyApply</NavLink>
                    </div>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission3/MyRepairOrder">MyRepairOrder</NavLink>
                    </div>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission3/MyPayOrder">MyPayOrder</NavLink>
                    </div>
                </div>
                <Outlet/>
            </div>
            
        </div>
    </div>
  )
}
