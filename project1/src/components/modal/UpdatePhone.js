import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from './Modal'
import {useForm} from 'react-hook-form'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 

export default function UpdatePhone({phone}) {
    const [updateModal,setUpdateModal] = useState(false)
    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
    }=useForm();

    function updatePhone(data){
        fetch(`http://localhost:8080/updatePhone`,{
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)
        }).then(()=>{
            window.location.reload()
        })
    }

  return (
    <div>
        <Button variant='dark' onClick={()=>{setUpdateModal(true);setValue("id",phone.id);setValue("model",phone.model);setValue("manufacturer",phone.manufacturer)}}>update</Button>
        <Modal isVisible={updateModal} title='update phone' content={
            <div>
                <Form>
                    <Form.Control type='hidden' {...register("id")}/>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs={3}>
                                <Form.Label>model:</Form.Label>
                            </Col>
                            <Col xs={9}>
                                <Form.Control type='text'  {...register("model",{required:true})}/>
                                {errors.model && <span style={{color:"red"}}>error</span>}
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>manufacturer:</Form.Label>
                            </Col>
                            <Col xs = {9}>
                                <Form.Control type='text' {...register("manufacturer",{required:true})}/>
                                {errors.manufacturer && <span style={{color:"red"}}>error</span>}
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <Button onClick={handleSubmit(updatePhone)}>submit</Button>
            </div>
        } onClose={()=>{setUpdateModal(false)}} />
    </div>
  )
}
