import React, { useEffect, useState } from "react";
import {Button, Col, Container , Input, Row } from 'reactstrap'
import axios, { all } from 'axios'
import { useNavigate } from "react-router-dom";
import But from '../pics/buttonicon.png'

const ProjectManager = () => {
    const [allProjects , setAllProjects] = useState([]);
    const [toggle , setToggle] = useState('');
    const date= new Date().toISOString()
    const navigate = useNavigate();

    useEffect(() => {
        let date;
        axios.get('http://localhost:8000/projects')
            .then(res =>{ setAllProjects(res.data.sort((a,b) => {return new Date(a.due_date).getTime() - 
                new Date(b.due_date).getTime()}) // Black belt - sorting by date
                ) })
            .catch(err => console.log(err))

    } , [toggle])

    const handleBacklog = (status,id,i) => {
        status == 'Not working'
        ?
            setAllProjects(allProjects.map( (project) => project._id == id ? axios.patch(`http://localhost:8000/projects/${id}`, {...project , status : 'Move to Completed'} )
                .then(res => setToggle(!toggle))
                .catch(err => console.log(err)) 
            : project))
        : status == 'Move to Completed'
            ? 
                setAllProjects(allProjects.map( (project) => project._id == id ? axios.patch(`http://localhost:8000/projects/${id}`,  {...project , status : 'Completed'} )
                .then(res => setToggle(!toggle))
                .catch(err => console.log(err))
                : project))
            :   
                axios.delete(`http://localhost:8000/projects/${id}`)
                    .then(res => setAllProjects(allProjects.filter( (project) => project._id == id ? '' : project)))
                    .catch(err => console.log(err))

    }

    return(
        <> 
            <h1 style={{textAlign : 'center'}}>Project Manager</h1>
            <Container >
                <Row xs='3'>
                    <Col><h2 style={{textAlign : 'center'}}>Backlog</h2></Col>
                    <Col><h2 style={{textAlign : 'center'}}>In progress</h2></Col>
                    <Col><h2 style={{textAlign : 'center'}}>Completed</h2></Col>
            
                </Row>
                <Row xs='3' style={{border : '1px solid black'}}>
                    <Col style={{maxHeight : '500px' , overflow :'auto'}}>
                        {allProjects ?
                        allProjects.map( (project,index) => 
                            project.status == 'Not working' 
                            ?
                                <Container className="col" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <p>Due date : <span style={project.due_date < date ? {color :'red'} : {color : 'black'}}> {project.due_date.substring(0,10)} </span>    </p>
                                    <Input type="button" style={{backgroundColor : 'orangered' ,color :'black'}} value='Start Project' onClick={() => handleBacklog(project.status,project._id,index)}/>
                                </Container>
                            : ''
                        )
                        : ''
                        }
                    </Col>
                    <Col style={{maxHeight : '500px' , overflow :'auto'}}>
                    {allProjects ?
                        allProjects.map( (project,index) => 
                            project.status == 'Move to Completed' 
                            ?
                                <Container className="col" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <p>Due date : <span style={project.due_date < date ? {color :'red'} : {color : 'black'}}> {project.due_date.substring(0,10)} </span></p>
                                    <Input type="button" style={{backgroundColor : 'lightgreen' ,color :'black'}} value='Move to completed' onClick={() => handleBacklog(project.status,project._id, index)}/>
                                </Container>
                            : ''
                        )
                        : ''
                        }
                    </Col>
                    <Col style={{maxHeight : '500px' , overflow :'auto'}}>
                    {allProjects ?
                        allProjects.map( (project ,index) => 
                            project.status == 'Completed' 
                            ?
                                <Container className="col" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <p>Due date : <span style={project.due_date < date ? {color :'red'} : {color : 'black'}}> {project.due_date.substring(0,10)} </span></p>
                                    <Input type="button" style={{backgroundColor : 'firebrick' ,color :'black'}} value='Remove Project' onClick={() => handleBacklog(project.status,project._id, index)}/>
                                </Container>
                            : ''
                        )
                        : ''
                        }
                    </Col>
                </Row>
                <Row>
                    <Col style={{alignItems : 'start' ,marginLeft : '40px' , height : '60px'}}>
                <Button style={{width : '20%' , marginTop : '5px'}} color="primary" onClick={() => navigate('/projects/new')}>Add a new Project</Button>
                <img src={But} alt='warwq' onClick={() => navigate('/projects/new')}></img>
                </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default ProjectManager