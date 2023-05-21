import React, {useState } from 'react'
import useUser from "./useUser"
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button'
import Modal from './modal/Modal'
import Form from "react-bootstrap/Form"
import {useForm} from 'react-hook-form'
import ChangeTel from './modal/ChangeTel'
import ChangePassword from './modal/ChangePassword'
import ShowMyPhone from './ShowMyPhone'

export default function ShowMyInformation() {
  const {user} = useUser()
  const [updateInformationModal,setUpdateApplyModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState:{errors},
    setValue
  }=useForm();

  function setFormValue(id,name,age,address){
    setValue("id",id)
    setValue("name",name);
    setValue("age",age);
    setValue("address",address)
  }

  function submitUpdateInformation(data){
    fetch("http://localhost:8080/updateUsers",{
      method:'post',
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
    <div className='container mt-5'>
      <div className='row mt-5'>
        <div className='mt-5' style={{backgroundColor:"#e2e3e5",width:"100%",height:"120px"}}></div>
      </div>
      <div>
        <Row>
          <Col xs={2}>name:</Col>
          <Col xs={9}>{user.name}</Col>
        </Row>
        <Row>
          <Col xs={2}>tel:</Col>
          <Col xs={9}>{user.tel}</Col>
        </Row>
        <Row>
          <Col xs={2}>age:</Col>
          <Col xs={9}>{user.age}</Col>
        </Row>
        <Row>
          <Col xs={2}>address:</Col>
          <Col xs={9}>{user.address}</Col>
        </Row>
        <Row>
          <Button onClick={()=>{setUpdateApplyModal(true);setFormValue(user.id,user.name,user.age,user.address)}}>edit information</Button>
          <Modal isVisible={updateInformationModal} title="update information" content={
            <div>
              <Form>
                  <Form.Control type='hidden' {...register("id")}/>
                  <Form.Group className='mt-3'>
                      <Row>
                          <Col xs={3}>
                              <Form.Label>name:</Form.Label>
                          </Col>
                          <Col xs={9}>
                              <Form.Control type='text'  {...register("name",{required:true})}/>
                              {errors.name && <span style={{color:"red"}}>no name</span>}
                          </Col>
                      </Row>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                      <Row>
                          <Col xs = {3}>
                              <Form.Label>age:</Form.Label>
                          </Col>
                          <Col xs = {9}>
                              <Form.Control type='text' {...register("age")}/>
                          </Col>
                      </Row>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                      <Row>
                          <Col xs={3}>
                              <Form.Label>address:</Form.Label>
                          </Col>
                          <Col xs={9}>
                              <Form.Control type='text' {...register("address")}/>
                          </Col>
                      </Row>
                  </Form.Group>
                  {/* <Form.Group className='mt-3'>
                      <Button className='btn-dark offset-10' type='submit'>update</Button>
                  </Form.Group> */}
              </Form>
              <Button variant='dark' onClick={handleSubmit(submitUpdateInformation)}>update</Button>
            </div>
          } onClose={()=>{setUpdateApplyModal(false)}} />
          <ChangeTel/>
          <ChangePassword/>
        </Row>
        <ShowMyPhone/>
        
        <Button variant='danger' onClick={()=>{alert("Wait for the system to add this feature...")}}>cancel account</Button>
      </div>
      
    </div>
  )
}
