import React, {useState } from 'react'
import Form from "react-bootstrap/Form"

import {useForm} from 'react-hook-form'
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState:{errors}
      }=useForm();

      const [loginModal,setLoginModal] = useState(false);

    function handleLoginSubmit(data){
        fetch("http://localhost:8080/login",{ 
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)})
        .then(res =>res.json())
        .then((result) =>{
            if (result == null){
                alert("Wrong phone number or password!");
            }else {
                let user = {id:result.id,name:result.name,tel:result.tel,password:result.password,age:result.age,roleId:result.roleId,address:result.address}
                localStorage.setItem("user",JSON.stringify(user))
                setLoginModal(false)
                navigate("/")
                window.location.reload();
            }
        })
        .catch(e => console.log("error",e))
    }



  return (
    <div>
        <button className='btn btn-dark' onClick={()=>setLoginModal(true)}>login</button>
        <Modal isVisible={loginModal} title="login" content={
            <div>
                <Form>
                    <Form.Group className='row'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>tel:</Form.Label>
                        <Form.Control type='text' placeholder='enter phone number' 
                        {...register("tel",{required:true})}
                        /> 
                        {errors.tel && <span style={{color:"red"}}>tel is empty</span>}
                    </Form.Group>
                    <Form.Group className='row mt-3'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>password:</Form.Label>
                        <Form.Control type='password' placeholder='password' 
                        {...register("password",{required:true})}
                        /> 
                        {errors.password && <span style={{color:"red"}}>password is empty</span>}
                    </Form.Group> 
                </Form>
                <div className='row mt-3'>
                    <button className='btn btn-dark offset-10' onClick={handleSubmit(handleLoginSubmit)}>login</button>
                </div>
            </div>
        } onClose={()=>setLoginModal(false)}/>
    </div>
  )
}