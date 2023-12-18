import React from 'react'
import styles from './ProtectedRoute.module.css'
import { Navigate, useNavigate } from 'react-router-dom'


export default function ProtectedRoute(props) {

  if (localStorage.getItem('dataToken') == null) {
    console.log(props.children);
    return <Navigate to={'/login'} />;
  }
  else {
    return props.children;
  }
}
