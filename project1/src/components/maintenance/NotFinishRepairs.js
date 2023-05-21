import React,{ useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/esm/Table'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 
import Form from 'react-bootstrap/Form'
import Modal from '../modal/Modal'
import {useForm} from 'react-hook-form'


export default function NotFinishRepairs() {
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const [lastButton,setLastButton] = useState(true)
    const [nextButton,setNextButton] = useState(false)
    const [repairList,setRepairList] = useState([])
    const [finishModal,setFinishModal] = useState(false)
    const [queryState,setQueryState] = useState("findNotFinishRepair")
    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors}
      }=useForm();

    function changePage(e){
        let changePage = e.target.value
        if (changePage-1<0 || changePage >totalPages){
            alert("no this page")
        }else {
            setPage(changePage-1)
        }
    }

    function finishRepair(data){
        let date = new Date();
        let year = date.getFullYear()
        let month = repair(date.getMonth() + 1);
        let day = repair(date.getDate());
        let time=year+"-"+month+"-"+day
        data.endTime = time
        fetch(`http://localhost:8080/finishRepair`,{
            method:'post',
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body:JSON.stringify(data)
        }).then(()=>{
            window.location.reload()
        })
    }

    function repair(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
    }

    function lastPage(){
        setPage(page-1)
    }

    function nextPage(){
        setPage(page+1)
    }

    useEffect(()=>{
        fetch(`http://localhost:8080/${queryState}/${page}`)
        .then(res=>res.json())
        .then((result)=>{
            setRepairList(result.content)
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
                <option value="findNotFinishRepair">findNotFinishRepair</option>
                <option value="findAllRepair">findAllRepair</option>
            </select>
        </div>
        <div className='row mt-5'>
            <Table>
                <thead>
                    <tr>
                        <th>applyTime</th>
                        <th>endTime</th>
                        <th>ownerName</th>
                        <th>tel</th>
                        <th>phoneModel</th>
                        <th>phoneManufacturer</th>
                        <th>fault</th>
                        <th>price</th>
                        <th>finish</th>
                    </tr>
                </thead>
                <tbody>
                    {repairList.map((repair,index)=>(
                        <tr key={index}>
                            <td>{repair.applyTime}</td>
                            <td>{repair.endTime}</td>
                            <td>{repair.ownerName}</td>
                            <td>{repair.tel}</td>
                            <td>{repair.phoneModel}</td>
                            <td>{repair.phoneManufacturer}</td>
                            <td>{repair.fault}</td>
                            <td>{repair.price}</td>
                            <td>{repair.isFinish && <>is finish</>}{!repair.isFinish && <Button onClick={()=>{setFinishModal(true);setValue("id",repair.id);setValue("price",repair.price);}}>finish</Button>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isVisible={finishModal} title="finish repair" content={
                <div>
                    <Form>
                        <Form.Control type='hidden' {...register("id")}/>
                        <Form.Group className='mt-3'>
                            <Row>
                                <Col md={4}>
                                    <Form.Label>Price after repair:</Form.Label>
                                </Col>
                                <Col md={8}>
                                    <Form.Control type='text' {...register("price",{required:true})}/>{errors.price && <span style={{color:"red"}}>no price set</span>}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                    <Button onClick={handleSubmit(finishRepair)}>finish</Button>
                </div>
            } onClose={()=>{setFinishModal(false)}}/>
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
