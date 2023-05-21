import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form"
import Modal from './Modal'

import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch,
    }=useForm();
    const [registerModal,setRegisterModal] = useState(false);

    function handleRegisterSubmit(data){
        fetch("http://localhost:8080/createNewUsers",{
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)})
        .then(res=>res.json())
        .then((result)=>{
            if (result){
                let user = {id:result.id,name:result.name,tel:result.tel,password:result.password,age:result.age,roleId:result.roleId,address:result.address}
                window.localStorage.setItem("user",JSON.stringify(user))
                setRegisterModal(false)
                navigate("/")
                window.location.reload();
            }else {
                alert("This tel number is already registered!")
            }
        })
        .catch((e) => {console.log("error",e)})
    }

  return (
    <div>
        <button className='btn btn-light' onClick={()=>setRegisterModal(true)}>register</button>
        <Modal isVisible={registerModal} title="register" content={
            <div>
                <Form>
                    <Form.Group className='row'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>name:</Form.Label>
                        <Form.Control type='text' placeholder='enter userName' {...register("name",{required:true})}/>
                        {errors.name && <span style={{color:"red"}}>error</span>}
                    </Form.Group>
                    <Form.Control type='hidden' value={3} {...register("roleId")}/>
                    <Form.Group className='row mt-2'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>tel:</Form.Label>
                        <Form.Control type='text' placeholder='enter tel' {...register("tel",{required:true})} />
                        {errors.tel && <span style={{color:"red"}}>error</span>}
                    </Form.Group>
                    <Form.Group className='row mt-2'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>password:</Form.Label>
                        <Form.Control type='password' placeholder='enter password' {...register("password",{required:true,minLength:6,maxLength:10})}/>
                        {errors.password && <span style={{color:"red"}}>error </span>}
                    </Form.Group>
                    <Form.Group className='row mt-2'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>password_repeat:</Form.Label>
                            <Form.Control type='password' placeholder='enter password again'{...register("password_repeat",{validate:value=>value===watch("password")})}/>
                            {errors.password_repeat && <span style={{color:"red"}}>error</span>}
                    </Form.Group>
                    <Form.Group className='row mt-2'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>age:</Form.Label>
                        <Form.Control type='text' {...register("age")}/>
                    </Form.Group>
                    <Form.Group className='row mt-2'>
                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>address:</Form.Label>
                        <Form.Control type='text' placeholder='enter address' {...register("address")}/>
                    </Form.Group>
                </Form>
                <div className='row mt-3'>
                    <button className='btn btn-dark offset-8' onClick={handleSubmit(handleRegisterSubmit)}>createNewUsers</button>
                </div>
            </div>
        } onClose={()=>setRegisterModal(false)} />
    </div>
  )
}