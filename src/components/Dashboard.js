import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navbar, Nav, Modal, Button } from 'react-bootstrap'
import axios from 'axios'

const Dashboard = () => {

  const { user, authToken, logout }= useAuth()

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({})
  const [show,setShow] = useState(false)

  const onChangeTask = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }

  const API_URL = process.env.REACT_APP_API_URL

  const getTasks = async () => {
    await axios.get(API_URL+'/tasks', {
      headers: {
        Authorization: `${authToken}`
      }
    }).then(res => {
      setTasks(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const addTask = async (task) => {
    console.log(task)
    await axios.post( API_URL+'/tasks', task, {
      headers: {
        Authorization: `${authToken}`
      }
    }).then(res => {
      getTasks()
      setShow(false)
    }).catch(err => {
      alert(err.response.data)
      console.log(err)
    })
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: {
        Authorization: `${authToken}`
      }
    }).then(res => {
      getTasks()
    }).catch(err => {
      console.log(err)
    })
  }

  const updateTask = async (id, task) => {
    await axios.put(`${API_URL}/tasks/${id}`, task, {
      headers: {
        Authorization: `${authToken}`
      }
    }).then(res => {
      getTasks()
      setTask({})
      setShow(false)
    }).catch(err => {
      console.log(err)
    })
  }
  
  
  useEffect(() => {
    document.title = 'Dashboard'
    
    getTasks()
  }, [])


  return (
    <div className='dashboard'>
      <Navbar bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand href="#home">Task Management App</Navbar.Brand>
          <Nav className="mr-auto">
            <span className="nav-link" onClick={()=>{
              setShow(true)
              setTask({name: '', description: '', status: 'todo'})
            }}>Add Todo</span>
            <span className='nav-link' onClick={logout}>Logout</span>
          </Nav>
        </div>
      </Navbar>
      <div className="container">
        <div className="mt-4">
          <h4 className='text-center mb-2'>Welcome {user.name}</h4>
          <Modal show={show ? true : false} onHide={()=>{
            setTask({})
            setShow(false)
            }}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={task.name} onChange={onChangeTask} name="name" placeholder="Enter name" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" value={task.description} onChange={onChangeTask} name="description" placeholder="Enter description" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select className="form-control" id="status" value={task.status} defaultValue={"todo"} onChange={onChangeTask} name="status">
                  <option disabled>Select status</option>
                  <option value="todo" selected>Todo</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>{
                setTask({})
                setShow(false)
              }}>Close</Button>
              {
                task._id ?
                <Button variant="primary" onClick={()=>updateTask(task._id, task)}>Save Changes</Button>
                :
                <Button variant="primary" onClick={()=>addTask(task)}>Save</Button>
              }
            </Modal.Footer>
          </Modal>
          <div className="row mt-5">
            <div className="col-md-4">
              <h5>Todo</h5>
              <div className="card">
                {
                  tasks.filter(task => task.status === 'todo').map(task => (
                    <div className="card-body border-bottom" key={task._id}>
                      <div className="row">
                        <div className="col-md-10">
                          <h6 className="card-title">{task.name}</h6>
                          <p className="card-text">{task.description}</p>
                        </div>
                        <div className="col-md-2">
                        <span className="me-3" onClick={() => {
                            setTask(task)
                            setShow(true)
                          }
                          }><i class="fas fa-edit"></i></span>
                          <span className="me-3" onClick={() => {
                            deleteTask(task._id)
                          }
                          }><i class="fas fa-trash"></i></span>
                        </div>
                      </div>
                    </div>
                  ))
                }                
              </div>
            </div>
            <div className="col-md-4">
              <h5>Inprogress</h5>
              <div className="card">
              {
                  tasks.filter(task => task.status === 'inprogress').map(task => (
                    <div className="card-body border-bottom" key={task._id}>
                      <div className="row">
                        <div className="col-md-10">
                          <h6 className="card-title">{task.name}</h6>
                          <p className="card-text">{task.description}</p>
                        </div>
                        <div className="col-md-2">
                          <span className="me-3" onClick={() => {
                            setTask(task)
                            setShow(true)
                          }
                          }><i class="fas fa-edit"></i></span>
                          <span className="me-3" onClick={() => {
                            deleteTask(task._id)
                          }
                          }><i class="fas fa-trash"></i></span>
                        </div>
                      </div>
                    </div>
                  ))
                }                
              </div>
            </div>
            <div className="col-md-4">
              <h5>Done</h5>
              <div className="card">
              {
                  tasks.filter(task => task.status === 'done').map(task => (
                    <div className="card-body border-bottom" key={task._id}>
                      <div className="row">
                        <div className="col-md-10">
                          <h6 className="card-title">{task.name}</h6>
                          <p className="card-text">{task.description}</p>
                        </div>
                        <div className="col-md-2">
                          <span className="me-3" onClick={() => {
                            setTask(task)
                            setShow(true)
                          }
                          }><i class="fas fa-edit"></i></span>
                          <span className="me-3" onClick={() => {
                            deleteTask(task._id)
                          }
                          }><i class="fas fa-trash"></i></span>
                        </div>
                      </div>
                    </div>
                  ))
                }               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard