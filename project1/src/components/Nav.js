import React, {useEffect, useState } from 'react'
import { NavLink, useNavigate} from "react-router-dom"
import "../css/bootstrap.css"
import "../css/style.css"
import useLogState from './useLogState'
import LoginModal from './modal/LoginModal'
import RegisterModal from './modal/RegisterModal'
import useUser from './useUser'


export default function Nav() {
    const navigate = useNavigate()
    const {logState,logoutState,handleChangeLogState} = useLogState();
    // const [user,setUser] = useState({})
    const {user} = useUser()
    const [permission,setPermission] = useState("")

    function logout(){
        localStorage.clear()
        navigate("/")
        window.location.reload();
    }

    useEffect(()=>{
        if (user.roleId===1){
            setPermission("Permission1")
        } else if (user.roleId===2){
            setPermission("Permission2")
        } else if (user.roleId===3){
            setPermission("Permission3")
        } else { setPermission("Permission")}
    },[user])


    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-light fixed-top">
                <h1 className="mr-2 nav-brand">
                    <NavLink className="mr-2 text-dark nav-link" to="/Home"><h1>Home</h1></NavLink>
                </h1>
                <div className="collapse navbar-collapse">
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/About">About</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to={permission}>permission</NavLink>
                        </li>
                    </ul>
                    
                    
                    {!user.name && <div className="form-inline mr-5 " style={{display:logState}}>
                        {/* login */}
                        <LoginModal/>

                        {/* register */}
                        <RegisterModal/>
                    </div>}
                    

                    {/* logout */}
                    {user.name && <div className='form-inline mr-5'>
                        <NavLink className="nav-link" to="/ShowMyInformation">Hello! {user.name}</NavLink>
                        <button className='btn btn-danger' onClick={logout}>logout</button>
                    </div>}
                    
                </div>
            </nav>
            
        </div>
    )
}

