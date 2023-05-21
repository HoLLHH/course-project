import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/esm/Table'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row' 

export default function MyRepairOrder() {
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const [lastButton,setLastButton] = useState(true)
    const [nextButton,setNextButton] = useState(false)
    const [repairList,setRepairList] = useState([])

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
        fetch(`http://localhost:8080/findRepairByTel/${page}?tel=${tel}`)
        .then(res=>res.json())
        .then((result)=>{
            setRepairList(result.content)
            setTotalPages(result.totalPages)
        })
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
                        <th>serial</th>
                        <th>applyTime</th>
                        <th>endTime</th>
                        <th>ownerName</th>
                        <th>tel</th>
                        <th>phoneModel</th>
                        <th>phoneManufacturer</th>
                        <th>fault</th>
                        <th>price</th>
                        <th>isFinish</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {repairList.map((repair,index)=>(
                        <tr key={index}>
                            <td>{repair.id}</td>
                            <td>{repair.applyTime}</td>
                            <td>{repair.endTime}</td>
                            <td>{repair.ownerName}</td>
                            <td>{repair.tel}</td>
                            <td>{repair.phoneModel}</td>
                            <td>{repair.phoneManufacturer}</td>
                            <td>{repair.fault}</td>
                            <td>{repair.price}</td>
                            <td>{!repair.isFinish && <span style={{color:"blue"}}>under repair...</span>}{repair.isFinish && <>completed</>}</td>
                            <td>{repair.isFinish && <>Completed, cannot delete</>} {!repair.isFinish &&<Button variant='danger'>delete</Button>}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
