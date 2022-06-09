import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {

  const [email,setEmail] = useState("");
  const [password, setPassword]= useState("");

  const { login } = useAuth()

  //const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email,password)
  }

  useEffect(() => {
    document.title = 'Login'
  }, [])
  return (
    <div className="login">
        <h3 className='mb-4'>Task Management App</h3>
        <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Password" />
            </div>
            <button className="btn btn-primary">Login</button>
            <div className="mt-3">
                <Link to="/register">Register</Link>
            </div>
        </form>
    </div>
  )
}

export default Login