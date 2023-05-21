import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Permission() {
  return (
    <div className='container mt-5'>
        <div className='row mt-5'>
            <div className='col-12'>
                <div className='mt-5'>
                    permission
                </div>
                <div className='row'>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission/Apply">Apply</NavLink>
                    </div>
                    <div className='mt-5'>
                        <NavLink className="nav-link" to="/Permission/ShowApplys">ShowApplys</NavLink>
                    </div>
                </div>
                <Outlet/>
            </div>
            
        </div>
    </div>
  )
}
