import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Input, Label, Row ,Button} from "reactstrap";

const AddProject = () => {

    const [project , setProject] = useState({
        name : '',
        due_date : ''
    })
    const [errors , setErrors] = useState({
        name : '',
        due_date : ''
    });
    const navigate = useNavigate();

    const formHandle = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/projects' , project)
            .then(res => navigate('/'))
            .catch(err =>{ setErrors(err.response.data.errors)} ) //Black belt  - front end validations
    }

    return(
        <>
            <h1 style={{textAlign : 'center'}}>Project Manager</h1>
            <Container style={{border : 'none'}}>
                <Row >
                    <Col md={{
                        offset: 7,
                        size: 6
                    }}
                        sm="12" 
                    style={{alignItems : 'end', border : 'none'}}>
                        <Link to='/' style={{fontSize : '1.5em'}}>Back to dashboard</Link>
                    </Col>
                </Row>
            </Container>
            <Form onSubmit={(e) => formHandle(e)}>
                <h4 style={{position : 'absolute' , top : '134px'}}>Plan a new Project</h4>
                <Container style={{border : 'none' , display : 'flex' , alignItems : 'center' , width : '540px',justifyContent : 'space-between'}}>
                    <Label>Project :</Label> 
                    <Input style={{width : '70%'}} type="text" value={project.name} onChange={(e) => setProject({...project, name : e.target.value})}></Input>
                </Container>
                {errors.name ?  //Black belt  - front end validations
                <p style={{marginLeft : '10px',marginTop :'10px' , color :'red'}}>{errors.name.message}</p>
                : ''
                }
                <Container style={{border : 'none' , display : 'flex' , alignItems : 'center' , width : '540px',justifyContent :'space-between'}}>
                    <Label>Due date : </Label>
                    <Input type="date" style={{width : '70%'}} value={project.due_date} onChange={(e) => setProject({...project, due_date : e.target.value})} ></Input>
                </Container>
                {errors.due_date ?  //Black belt  - front end validations
                <p style={{marginLeft : '10px',marginTop :'10px' , color : 'red'}}>{errors.due_date.message}</p>
                : ''
                }
                <Button type="submit" color="primary" style={{boxShadow : '6px 6px black'}}> Plan Project</Button>
            </Form>
        </>
    )
}

export default AddProject