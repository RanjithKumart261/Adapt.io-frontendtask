import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {

 // const API_URL = process.env.REACT_APP_API_URL;

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword]= useState("");

  const { register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name,email,password)
  }

  useEffect(() => {
    document.title = 'Register'
  }, [])

  return (
    <div className="login">
      <h3 className='mb-4'>Task Management App</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Password" />
            </div>
            <button className="btn btn-primary">Register</button>
            <div className="mt-3">
                <Link to="/login">Login</Link>
            </div>
        </form>
    </div>
  )
}

export default Register