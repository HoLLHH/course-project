import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
// import Col from 'react-bootstrap/esm/Col'
// import Row from 'react-bootstrap/esm/Row' 
// import {useForm} from 'react-hook-form'
// import Modal from '../modal/Modal'
// import Form from "react-bootstrap/Form"

export default function ShowUsers() {
    const [userList,setUserList] = useState([])
    // const [updateUserModal,setUpdateUserModal] = useState(false)
    const [page,setPage] = useState(0)
    const [totalPages,setTotalPages] = useState(1)
    const [lastButton,setLastButton] = useState(true)
    const [nextButton,setNextButton] = useState(false)
    const [contentLength,setContentLength] = useState(0)

    // const {
    //     register,
    //     setValue,
    //     handleSubmit,
    //     formState:{errors}
    //   }=useForm();

    // function setFormValue(id,name,age,address){
    //     setValue("id",id)
    //     setValue("name",name)
    //     setValue("address",address)
    //     setValue("age",age)
        
    // }

    // function handleUpdateUserSubmit(data){
    //     fetch("http://localhost:8080/updateUsers",{
    //         method:'post',
    //         headers: {"Content-Type": "application/json;charset=utf-8"},
    //         body:JSON.stringify(data)})
    //         .then(()=>{
    //             window.location.reload();
    //         })
    // }

    function deleteUser(id){
        fetch(`http://localhost:8080/deleteUsersById/${id}`,{method:'post'})
        .then(()=>{
            if(contentLength === 1 && page > 0){
                setPage(page-1)
            }else {
                window.location.reload();
            }
        })
        
    }

    function editPage(e){
        let editPage = e.target.value
        if (editPage-1<0 || editPage >totalPages){
            alert("no this page")
        }else {
            setPage(editPage-1)
        }
    }

    function lastPage(){
        setPage(page-1)
    }

    function nextPage(){
        setPage(page+1)
    }

    useEffect(()=>{
        fetch(`http://localhost:8080/showUsers/${page}`)
        .then(res=>res.json())
        .then((result)=>{
            setUserList(result.content);
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
                        <th>name</th>
                        <th>tel</th>
                        <th>role</th>
                        <th>age</th>
                        <th>address</th>
                        <th>delete</th>
                    </tr>
                </thead>
                
                <tbody>
                    {userList.map((users,index)=>(
                        <tr key={index}>
                            <td>{users.name}</td>
                            <td>{users.tel}</td>
                            {users.roleId === 1 && <th>admin</th>}
                            {users.roleId === 2 && <th>maintenance</th>}
                            {users.roleId === 3 && <th>general</th>}
                            <td>{users.age}</td>
                            <td>{users.address}</td>
                            {/* <td><Button variant='dark' onClick={()=>{setUpdateUserModal(true);setFormValue(users.id,users.name,users.age,users.address)}} >update</Button>
                                <Modal isVisible={updateUserModal} title="update" content={
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
                                        </Form>
                                        <div className='row mt-3'>
                                            <button className='btn btn-dark offset-10' onClick={handleSubmit(handleUpdateUserSubmit)} >update</button>
                                        </div>
                                    </div>
                                } onClose={()=>setUpdateUserModal(false)}/>
                            </td> */}
                            <td><Button variant='danger' onClick={()=>{deleteUser(users.id)}}>delete</Button></td>
                        </tr>
                    ))}
                </tbody>
                
                
            </Table>
        </div>
        
    </div>
  )
}