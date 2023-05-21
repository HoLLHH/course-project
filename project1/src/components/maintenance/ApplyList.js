import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import Table from "react-bootstrap/Table"
import Modal from '../modal/Modal'
import {useForm} from 'react-hook-form'

export default function ApplyList() {
    const [applyId,setApplyId] = useState(0)
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const [applyList,setApplyList] = useState([])
    const [lastButton,setLastButton] = useState(true)
    const [nextButton,setNextButton] = useState(false)
    const [addSuggestionModal,setAddSuggestionModal] = useState(false)
    const [processedModal,setProcessedModal] = useState(false)
    const [suggestion,setSuggestion] = useState("")
    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
      }=useForm();

    function addSuggestion(){
        if (suggestion === ""|| suggestion ===null) {
            alert("suggestion isEmpty!")
        }else{
            let id = applyId
            // console.log(JSON.stringify({id,suggestion}));
            fetch(`http://localhost:8080/addSuggestion`,
            {method:"post",
            headers:{"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify({id,suggestion})})
            .then(()=>{
                window.location.reload()
            })
        }
    }

    function setProcessedForm(id,operate,estimatedDays,valuation){
        setValue("id",id);
        setValue("operate",operate);
        setValue("estimatedDays",estimatedDays);
        setValue("valuation",valuation);
    }

    function processed(data){
        console.log(JSON.stringify(data));
        fetch(`http://localhost:8080/processedApply`,{
            method:"post",
            headers:{"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)})
        .then(()=>{
            window.location.reload()
        })
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
        fetch(`http://localhost:8080/findNotProcessedApply/${page}`)
        .then(res=>res.json())
        .then((result)=>{
            setApplyList(result.content)
            setTotalPages(result.totalPages)
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
                        <th>operate</th>
                    </tr>
                </thead>
                <tbody>
                    {applyList.map((apply,index)=>(
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
                            <td><Button  onClick={()=>{setAddSuggestionModal(true);setApplyId(apply.id)}}>add suggestion</Button></td>
                            <td><Button variant='success' onClick={()=>{setProcessedModal(true);setProcessedForm(apply.id,apply.operate,apply.estimatedDays,apply.valuation)}}>deal with</Button></td>
                        </tr>
                    ))}
                </tbody>
                
            </Table>
            <Modal isVisible={addSuggestionModal} title="add suggestion" content={<div>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col xs={3}><Form.Label>suggestion:</Form.Label></Col>
                            <Col xs={9}><Form.Control as="textarea" value={suggestion} onChange={(e)=>{setSuggestion(e.target.value)}} /></Col>
                        </Row>
                    </Form.Group>
                </Form>
                <Button onClick={()=>{addSuggestion()}}>add suggestion</Button>
            </div>} onClose={()=>{setAddSuggestionModal(false);setSuggestion("")}}/>

            <Modal isVisible={processedModal} title="processed" content={<div>
                <Form>
                    <Form.Control type='hidden' {...register("id")} />
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs={3}><Form.Label>operate</Form.Label></Col>
                            <Col xs={9}><Form.Control as="textarea" {...register("operate",{required:true})}/></Col>
                        </Row>
                        {errors.operate && <span style={{color:"red"}}>operate isEmpty</span>}
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs={3}><Form.Label>estimatedDays</Form.Label></Col>
                            <Col xs={9}><Form.Control type='text' {...register("estimatedDays",{required:true})} /></Col>
                        </Row>
                        {errors.estimatedDays && <span style={{color:"red"}}>estimatedDays isEmpty</span>}
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Row>
                            <Col xs={3}><Form.Label>valuation</Form.Label></Col>
                            <Col xs={9}><Form.Control type='text' {...register("valuation",{required:true})} /></Col>
                        </Row>
                        {errors.valuation && <span style={{color:"red"}}>valuation isEmpty</span>}
                    </Form.Group>
                </Form>
                <Button onClick={handleSubmit(processed)}>submit</Button>
            </div>} onClose={()=>{setProcessedModal(false)}}/>
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
