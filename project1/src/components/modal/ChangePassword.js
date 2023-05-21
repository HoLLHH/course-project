import React, { useState } from 'react'
import Modal from './Modal'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import useUser from '../useUser'

export default function ChangePassword() {
    const {user} = useUser()
    const [modal,setModal] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
        watch
      }=useForm();

    function SubmitChangPassword(data){
        fetch("http://localhost:8080/changePassword",{
            method:"post",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)})
        .then(res=>res.json())
        .then((result)=>{
            let user ={id:result.id,name:result.name,tel:result.tel,password:result.password,age:result.age,roleId:result.roleId,address:result.address}
            localStorage.setItem("user",JSON.stringify(user))
            window.location.reload()
        })
    }
    

    
  return (
    <div style={{marginLeft:"3px"}}>
        <Button onClick={()=>{setModal(true);setValue("wantChange",user.password);setValue("id",user.id)}}>change password</Button>
        <Modal isVisible={modal} title="change password" content={<div>
            <Form>
                <Form.Control type='hidden' {...register("id")}/>
                <Form.Control type='hidden' {...register("wantChange")}/>
                <Form.Group className='mt-3'>
                    <Row>
                        <Col xs={3}>
                            <Form.Label>your old password:</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type='password'  {...register("oldPassword",{validate:value=>value===watch("wantChange")})}/>
                            {errors.oldPassword && <span style={{color:"red"}}>old password error</span>}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Row>
                        <Col xs={3}>
                            <Form.Label>enter your new password:</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type='password'  {...register("password",{required:true,validate:value=>value!==watch("oldPassword")})}/>
                            {errors.password && <span style={{color:"red"}}>your new password number can not be empty or cannot be the same as the old password</span>}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Row>
                        <Col xs={3}>
                            <Form.Label>re-enter your new password:</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type='password'  {...register("re_password",{validate:value=>value===watch("password")})}/>
                            {errors.re_password && <span style={{color:"red"}}>must be the same as new password</span>}
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit(SubmitChangPassword)}>submit</Button>
        </div>} onClose={()=>{setModal(false)}}></Modal>
    </div>
  )
}