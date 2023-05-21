import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from './Modal'
import {useForm} from 'react-hook-form'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import {useNavigate} from "react-router-dom"

export default function ApplyMyPhoneRepair({phone,user}) {
    const [applyModal,setApplyModal] = useState(false)
    const navigate = useNavigate()

    function applyPhoneRepair(data){
        let date = new Date();
        let year = date.getFullYear()
        let month = repair(date.getMonth() + 1);
        let day = repair(date.getDate());
        let time=year+"-"+month+"-"+day
        data.time = time
        let jsonForm = JSON.stringify(data);
        console.log(jsonForm);
        fetch("http://localhost:8080/insertApply",{ 
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)})
        navigate(`/Permission${user.roleId}/MyApply`)
    }

    function repair(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
    }

    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
    }=useForm();
  return (
    <div>
        <Button onClick={()=>{setApplyModal(true);setValue("phoneModel",phone.model);setValue("phoneManufacturer",phone.manufacturer);setValue("tel",user.tel)}}>apply</Button>
        <Modal isVisible={applyModal} title="apply this phone repair" content={
            <div>
                <Form>
                    <Form.Control type='hidden' {...register("tel")}/>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs={3}>
                                <Form.Label>model:</Form.Label>
                            </Col>
                            <Col xs={9}>
                                <Form.Control type='text' disabled {...register("phoneModel",{required:true})}/>
                                {errors.phoneModel && <span style={{color:"red"}}>error</span>}
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs = {3}>
                                <Form.Label>manufacturer:</Form.Label>
                            </Col>
                            <Col xs = {9}>
                                <Form.Control type='text' disabled {...register("phoneManufacturer",{required:true})}/>
                                {errors.phoneManufacturer && <span style={{color:"red"}}>error</span>}
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col lg={3}>
                                <Form.Label>fault:</Form.Label>
                            </Col>
                            <Col lg={9}>
                                <Form.Control as="textarea" {...register("fault",{required:true})} />{errors.fault && <span style={{color:"red"}}>not fault</span>}
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <Button onClick={handleSubmit(applyPhoneRepair)}>submit</Button>
            </div>
        } onClose={()=>{setApplyModal(false)}}/>
    </div>
  )
}
