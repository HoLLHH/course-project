import React, { useEffect, useState } from 'react'
import Modal from './modal/Modal'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import Table from "react-bootstrap/Table"
import {useForm} from 'react-hook-form'

export default function ShowApplys() {
    const [applys,setApplys] = useState([])
    const [updateApplyModal,setUpdateApplyModal] = useState(false)
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
      }=useForm();

    function setFormValue(id,time,fault,phoneManufacturer,phoneModel,tel){
        setValue("id",id)
        setValue("time",time)
        setValue("fault",fault)
        setValue("phoneManufacturer",phoneManufacturer)
        setValue("phoneModel",phoneModel)
        setValue("tel",tel)
        
    }

    function handleUpdateApplySubmit(data){
        fetch("http://localhost:8080/updateApply",{
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)})
            .then(()=>{
                window.location.reload()
            })
    }

    function deleteApply(id){
        fetch(`http://localhost:8080/deleteApplyById/${id}`,{method:'post'})
        .then(()=>{
            window.location.reload()
        })
        
    }

    useEffect(()=>{
        fetch(`http://localhost:8080/findAllApply/${page}`)
        .then(res=>res.json())
        .then((result)=>{
            setApplys(result.content);
            setTotalPages(result.totalPages)
        })
        .catch(e=>{console.log("error",e);})
    },[])
  return (
    <div className='container mt-5'>
        <div className='row mt-5'>
            <Table>
                <thead>
                    <tr>
                        <th>phoneModel</th>
                        <th>phoneManufacturer</th>
                        <th>tel</th>
                        <th>fault</th>
                        <th>time</th>
                        <th>suggestion</th>
                        <th>operate</th>
                        <th>estimatedDays</th>
                        <th>valuation</th>
                        <th>isProcessed</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                </thead>
                
                <tbody>
                    {applys.map((apply,index)=>(
                        <tr key={index}>
                            <td>{apply.phoneModel}</td>
                            <td>{apply.phoneManufacturer}</td>
                            <td>{apply.tel}</td>
                            <td>{apply.fault}</td>
                            <td>{apply.time}</td>
                            <td>{apply.suggestion}</td>
                            <td>{apply.operate}</td>
                            <td>{apply.estimatedDays}</td>
                            <td>{apply.valuation}</td>
                            <td>{!apply.processed && <>unprocessed</>}{apply.processed && <>Processed</>}</td>
                            <td>{!apply.processed && <><Button variant='dark' onClick={()=>{setUpdateApplyModal(true);setFormValue(apply.id,apply.time,apply.fault,apply.phoneManufacturer,apply.phoneModel,apply.tel)}} >update</Button></>}
                                {apply.processed && <span style={{color:"red"}}>Cannot be edited</span>}
                                <Modal isVisible={updateApplyModal} title="update" content={
                                    <div>
                                        <Form>
                                            <Form.Control type='hidden' {...register("id")}/>
                                            <Form.Group className='mt-3'>
                                                <Row>
                                                    <Col xs={3}>
                                                        <Form.Label>phoneModel:</Form.Label>
                                                    </Col>
                                                    <Col xs={9}>
                                                        <Form.Control type='text'  {...register("phoneModel",{required:true})}/>
                                                        {errors.phoneModel && <span style={{color:"red"}}>error</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group className='mt-3'>
                                                <Row>
                                                    <Col xs = {3}>
                                                        <Form.Label>phoneManufacturer:</Form.Label>
                                                    </Col>
                                                    <Col xs = {9}>
                                                        <Form.Control type='text' {...register("phoneManufacturer",{required:true})}/>
                                                        {errors.phoneManufacturer && <span style={{color:"red"}}>error</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group className='mt-3'>
                                                <Row>
                                                    <Col xs={3}>
                                                        <Form.Label>time:</Form.Label>
                                                    </Col>
                                                    <Col xs={9}>
                                                        <Form.Control type='date' {...register("time")}/>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group className='mt-3'>
                                                <Row>
                                                    <Col xs={3}>
                                                        <Form.Label>fault:</Form.Label>
                                                    </Col>
                                                    <Col xs={9}>
                                                        <Form.Control type='text' placeholder='fault' {...register("fault",{required:true})}/>
                                                        {errors.fault && <span style={{color:"red"}}>error</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group className='mt-3'>
                                                <Row>
                                                    <Col xs={3}>
                                                        <Form.Label className='col-form-label col-sm-4 text-sm-right'>tel:</Form.Label>
                                                    </Col>
                                                    <Col xs={9}>
                                                        <Form.Control type='text' placeholder='tel' {...register("tel",{required:true})}/>
                                                        {errors.tel && <span style={{color:"red"}}>error</span>}
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            {/* <Form.Group className='mt-3'>
                                                <Button className='btn-dark offset-10' type='submit'>update</Button>
                                            </Form.Group> */}
                                        </Form>
                                        <div className='row mt-3'>
                                            <button className='btn btn-dark offset-10' onClick={handleSubmit(handleUpdateApplySubmit)} >update</button>
                                        </div>
                                    </div>
                                } onClose={()=>setUpdateApplyModal(false)}/>
                            </td>
                            <td><Button variant='danger' onClick={()=>{deleteApply(apply.id)}}>delete</Button></td>
                        </tr>
                    ))}
                </tbody>
                
                
            </Table>
        </div>
        
    </div>
  )
}
