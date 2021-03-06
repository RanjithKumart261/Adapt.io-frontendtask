import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function AuthRoute({ children }) {
  const { isAuthenticated } = useAuth()

  return !isAuthenticated ? children : <Navigate to="/" />
}