import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem("token");
            setAuthToken(token);
            if(token){
                await axios.get(`${API_URL}/auth/current`, {
                    headers: {
                        Authorization: `${token}`
                    }
                }).then(res => {
                    setUser(res.data);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                }).catch(err => {
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);                    
                })
            } else {
                setIsAuthenticated(false);            
            }            
            setIsLoading(false);            
        };
        checkLoggedIn();
    }, [API_URL]);

    const login = async (email, password) => {
        await axios.post(`${API_URL}/auth/login`, {
            email,password
        })
        .then(res => {
            if(res.status === 200){
                setAuthToken(res.data.token);
                setUser(res.data.user)
                setIsAuthenticated(true);
                localStorage.setItem("token", res.data.token);
            }
            else if(res.status === 401 || res.status === 403){
                setIsAuthenticated(false);
            }
        }).catch(err => {
            setIsAuthenticated(false);
            alert("Please Enter the Correct Credentials")
        })
    }

    const register = async (name,email,password) => {
        await axios.post(`${API_URL}/auth/register`, {
            name,email,password
        })
        .then(res => {
            if(res.status === 200){
                alert("User Registration Successful")
                navigate('/login')
            }
            else{
                alert("Please Enter the Correct Fields")
            }
        }).catch(err => {
            console.log(err);
            alert("Please Enter the Correct Fields")
        })
    }

    const logout = async () => {
        setAuthToken(null);
        setUser({});
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        authToken,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )

}