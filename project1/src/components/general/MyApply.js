
import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import Table from "react-bootstrap/Table"
import {useForm} from 'react-hook-form'
import useUser from '../useUser'

export default function MyApply() {
    const {user} = useUser()
    const [applys,setApplys] = useState([])
    const [applyDetail,setApplyDetail] = useState({})
    const [updateApplyModal,setUpdateApplyModal] = useState(false)
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const [lastButton,setLastButton] = useState(true)
    const [nextButton,setNextButton] = useState(false)
    const [contentLength,setContentLength] = useState(0)
    const [detailsModal,setDetailsModal] = useState(false)
    const [start,setStart] = useState(false)
    const [applyState,setApplyState] = useState("")
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
                window.location.reload();
            })
    }

    function deleteApply(id){
        fetch(`http://localhost:8080/deleteApplyById/${id}`,{method:'post'})
        .then(()=>{
            if(contentLength === 1 && page > 0){
                setPage(page-1)
            }else {
                window.location.reload();
            }
            
        })
        
    }

    function canStart(operate) {
        if(operate === null || operate === ""){
            setStart(true)
        }else {
            setStart(false)
        }
    }

    function insertRepair(apply) {
        let repair = applyToRepair(apply)
        console.log(JSON.stringify(repair));
        fetch(`http://localhost:8080/insertRepair`,{
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(repair)
        })
        .then(()=>{
            window.location.reload()
        })
    }

    function applyToRepair(apply){
        let applyId= apply.id;
        let applyTime = apply.time
        let tel = apply.tel
        let phoneModel = apply.phoneModel
        let phoneManufacturer = apply.phoneManufacturer
        let fault = apply.fault
        let price = apply.valuation
        let ownerName = user.name
        return {applyId,applyTime,ownerName,tel,phoneModel,phoneManufacturer,fault,price}
    }

    function changePage(e){
        let changePage = e.target.value
        if (changePage-1<0 || changePage >totalPages){
            alert("no this page")
        }else {
            setPage(changePage-1)
        }
    }

    function lastPage(){
        setPage(page-1)
    }

    function nextPage(){
        setPage(page+1)
    }

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"))
        let tel = user.tel.substr(1)
        fetch(`http://localhost:8080/findApplyByTel/${page}?tel=${tel}`)
        .then(res=>res.json())
        .then((result)=>{
            setApplys(result.content);
            setTotalPages(result.totalPages)
            setContentLength(result.content.length)
        })
        .catch(e=>{console.log("error",e);})
    },[page])

    useEffect(()=>{
        if (page < 1 && page+1 !== totalPages){
            setLastButton(true)
            setNextButton(false)
        }else if(page+1 === totalPages && page > 0){
            setNextButton(true)
            setLastButton(false)
        }else if(page <1 && page+1 === totalPages){
            setLastButton(true)
            setNextButton(true)
        }else {
            setLastButton(false)
            setNextButton(false)
        }
    },[page,totalPages])
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
                        <th>details</th>
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
                            <td>
                                <div className='showThreeLines'>{apply.operate}</div></td>
                            <td>{apply.estimatedDays}</td>
                            <td>{apply.valuation}</td>
                            <td>{apply.state ==="finish" && <span style={{color:"#28a745"}}>completed</span>}{apply.state ==="waitPay" && <span style={{color:"blue"}}>wait pay...</span>}{apply.state ==="start" && <span style={{color:"blue"}}>under repair...</span>}{apply.state === null &&<>{!apply.processed && <>unprocessed</>}{apply.processed && <Button onClick={()=>{setDetailsModal(true);setApplyDetail(apply);canStart(apply.operate)}}>details</Button>}</>}</td>
                            <td>{!apply.processed && <><Button variant='dark' onClick={()=>{setUpdateApplyModal(true);setFormValue(apply.id,apply.time,apply.fault,apply.phoneManufacturer,apply.phoneModel,apply.tel)}} >update</Button></>}
                                {apply.processed && <span style={{color:"red"}}>Cannot be edited</span>}
                                
                            </td>
                            <td>{apply.state !==null && <span style={{color:"red"}}>Cannot delete</span>}{apply.state === null && <Button variant='danger' onClick={()=>{deleteApply(apply.id)}}>delete</Button>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isVisible={detailsModal} title="apply detail" content={
                <div>
                    <Row>
                        <Col xs={4}>phoneModel:</Col>
                        <Col xs={8}>{applyDetail.phoneModel}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>phoneManufacturer:</Col>
                        <Col xs={8}>{applyDetail.phoneManufacturer}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>tel:</Col>
                        <Col xs={8}>{applyDetail.tel}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>fault:</Col>
                        <Col xs={8}>{applyDetail.fault}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>time:</Col>
                        <Col xs={8}>{applyDetail.time}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>suggestion:</Col>
                        <Col xs={8}>{applyDetail.suggestion}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>operate:</Col>
                        <Col xs={8}>{applyDetail.operate}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>estimatedDays(Unit: day):</Col>
                        <Col xs={8}>{applyDetail.estimatedDays}</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>valuation(RUB):</Col>
                        <Col xs={8}>{applyDetail.valuation}</Col>
                    </Row>
                    <Row>
                        <Button disabled={start} onClick={()=>{insertRepair(applyDetail)}} >start maintenance</Button>
                    </Row>
                </div>
            } onClose={()=>{setDetailsModal(false)}}/>

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
                                    <Form.Control as="textarea" placeholder='fault' {...register("fault",{required:true})}/>
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
                                    <Form.Control type='text' disabled="disable" placeholder='tel' {...register("tel",{required:true})}/>
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
            
        </div>
        <Row>
            <Col sm={5}><div></div></Col>
            <Col sm={2}>
                <button disabled={lastButton} onClick={()=>{lastPage()}}>《</button>
                <input type='text' style={{width:"30px"}} value={page+1} onChange={(e)=>{changePage(e)}} />/<span>{totalPages}</span>
                <button disabled={nextButton} onClick={()=>{nextPage()}}>》</button>
            </Col>
            
        </Row>
    </div>
  )
}
