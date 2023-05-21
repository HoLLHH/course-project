import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import Button from 'react-bootstrap/esm/Button' 
import Form from 'react-bootstrap/Form'
import Modal from '../modal/Modal'
import {useForm} from 'react-hook-form'

export default function MyPayOrder() {
    const [payOrderList,setPayOrderList] = useState([])
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const [lastButton,setLastButton] = useState(true)
    const [nextButton,setNextButton] = useState(false)
    const [payModal,setPayModal] = useState(false)
    const [queryState,setQueryState] = useState("withoutPayment")
    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
      }=useForm();

    function pay(data){
        fetch(`http://localhost:8080/payPayOrder`,{
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)
        }).then(()=>{
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
        let user = JSON.parse(localStorage.getItem("user"))
        let tel = user.tel.substr(1)
        fetch(`http://localhost:8080/${queryState}/${page}?tel=${tel}`)
        .then(res=>res.json())
        .then((result)=>{
            setPayOrderList(result.content)
            setTotalPages(result.totalPages)
        })
    },[page,queryState])

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
            <select onChange={(e)=>{setQueryState(e.target.value)}}>
                <option value="withoutPayment">withoutPayment</option>
                <option value="findPayOrderByTel">findAllPayOrderByTel</option>
            </select>
        </div>
        <div className='row mt-5'>
            <Table>
                <thead>
                    <tr>
                        <th>tel</th>
                        <th>repairSerial</th>
                        <th>price</th>
                        <th>pay</th>
                    </tr>
                </thead>
                <tbody>
                    {payOrderList.map((payOrder,index)=>(
                        <tr key={index}>
                            <td>{payOrder.tel}</td>
                            <td>{payOrder.repairId}</td>
                            <td>{payOrder.price}</td>
                            <td>{payOrder.pay && <span style={{color:"#28a745"}}>payment completed</span>}{!payOrder.pay && <Button onClick={()=>{setPayModal(true);setValue("id",payOrder.id);setValue("price",payOrder.price)}}>pay</Button>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isVisible={payModal} title="" content={
                <div>
                     <Form>
                        <Form.Control type='hidden' {...register("id")}/>
                        <Form.Group className='mt-3'>
                            <Row>
                                <Col md={4}>
                                    <Form.Label>price:</Form.Label>
                                </Col>
                                <Col md={8}>
                                    <Form.Control type='text' disabled {...register("price")}/>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                    <Button onClick={handleSubmit(pay)}>pay</Button>
                </div>
            } onClose={()=>{setPayModal(false)}}/>
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
