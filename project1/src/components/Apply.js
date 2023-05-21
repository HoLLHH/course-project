import {useNavigate} from "react-router-dom"
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form';

export default function Apply() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();

  function submitApply(data){
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
      navigate("/Permission/ShowApplys")
  }

  function repair(i){
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

  // useEffect(()=>{
  //   fetch('http://localhost:8080/insertApply')
  // })

  return (
    <div>
      <Form style={{width:"100%"}}>
        <Form.Group className='mt-3'>
          <Row>
            <Col md={3}>
              <Form.Label>phoneModel:</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control type='text' {...register("phoneModel",{required:true})}/>{errors.phoneModel && <span style={{color:"red"}}>not phoneModel</span>}
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Row>
            <Col md={3}>
              <Form.Label>phoneManufacturer:</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control type='text' {...register("phoneManufacturer",{required:true})}/>{errors.phoneManufacturer && <span style={{color:"red"}}>not phoneManufacturer</span>}
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
        <Form.Group className='mt-3'>
          <Row>
            <Col lg={3}>
              <Form.Label>tel number:</Form.Label>
            </Col>
            <Col lg={9}>
              <Form.Control type='text' {...register("tel",{required:true})}/>{errors.tel && <span style={{color:"red"}}>not telephone number</span>}
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Button className='mt-3 offset-11' variant='dark' onClick={handleSubmit(submitApply)} >submit</Button>
          
    </div>
  )
}
