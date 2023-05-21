import React, { useState } from 'react'
import Modal from './Modal'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import useUser from '../useUser'

export default function ChangeTel() {
    const {user} = useUser()
    const [modal,setModal] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
        watch
      }=useForm();

    function SubmitChangTel(data){
        fetch("http://localhost:8080/changeTel",{
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
        <Button onClick={()=>{setModal(true);setValue("oldTel",user.tel);setValue("id",user.id)}}>change phone number</Button>
        <Modal isVisible={modal} title="change tel" content={<div>
            <Form>
                <Form.Control type='hidden' {...register("id")}/>
                <Form.Group className='mt-3'>
                    <Row>
                        <Col xs={3}>
                            <Form.Label>your old phone number:</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type='text' disabled="disable"  {...register("oldTel")}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Row>
                        <Col xs={3}>
                            <Form.Label>enter your new phone number:</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type='text'  {...register("tel",{required:true,validate:value=>value!==watch("oldTel")})}/>
                            {errors.tel && <span style={{color:"red"}}>your new phone number can not be empty or cannot be the same as the old</span>}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Row>
                        <Col xs={3}>
                            <Form.Label>re-enter your new phone number:</Form.Label>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type='text'  {...register("re_tel",{validate:value=>value===watch("tel")})}/>
                            {errors.re_tel && <span style={{color:"red"}}>must be the same as new phone number</span>}
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit(SubmitChangTel)}>submit</Button>
        </div>} onClose={()=>{setModal(false)}}></Modal>
    </div>
  )
}
