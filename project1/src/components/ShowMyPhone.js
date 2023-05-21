import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import Form from 'react-bootstrap/Form';
import Modal from './modal/Modal';
import useUser from './useUser';
import UpdatePhone from './modal/UpdatePhone';
import ApplyMyPhoneRepair from './modal/ApplyMyPhoneRepair';

export default function ShowMyPhone() {
    const {user} = useUser()
    const [myPhone,setMyPhone] = useState([])
    const [addPhoneModal,setAddPhoneModal] = useState(false)
    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
    }=useForm();

    function addPhone(data){
        fetch(`http://localhost:8080/insertPhone`,
        {method:"post",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body:JSON.stringify(data)})
        .then(()=>{
            window.location.reload()
        })
    }

    function deletePhone(id){
        fetch(`http://localhost:8080/deletePhone/${id}`,{method:"post"})
        .then(()=>{
            window.location.reload()
        })
    }

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        fetch(`http://localhost:8080/findPhoneByOwnerId?ownerId=${user.id}`)
        .then(res=>res.json())
        .then((result)=>{
            setMyPhone(result)
        })
    },[])
  return (
    <div className='mt-5'>
        <div>
            <h2>my phone</h2>
        </div>
        <Table>
            <thead>
                <tr>
                    <th>model</th>
                    <th>manufacturer</th>
                    <th>apply repair</th>
                    <th>update</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {myPhone.map((phone,index)=>(
                <tr key={index}>   
                    <td>{phone.model}</td>
                    <td>{phone.manufacturer}</td>
                    <td><ApplyMyPhoneRepair phone={phone} user={user} /></td>
                    <td><UpdatePhone phone={phone}/></td>
                    <td><Button variant='danger' onClick={()=>{deletePhone(phone.id)}}>delete</Button></td>
                </tr>))}
            </tbody>
        </Table>
        <Button onClick={()=>{setAddPhoneModal(true);setValue("ownerId",user.id)}}>add phone information</Button>
        <Modal isVisible={addPhoneModal} title="add phone information" content={
            <div>
                <Form>
                    <Form.Control type='hidden' {...register("ownerId")}/>
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
                <Button onClick={handleSubmit(addPhone)}>add</Button>
            </div>
        } onClose={()=>{setAddPhoneModal(false)}} />
    </div>
  )
}
