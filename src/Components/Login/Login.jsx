import React, { useState, useContext } from 'react'
import { Formik, useFormik } from 'formik'
import styles from './Login.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from "react-helmet";


export default function Login({ saveUserData, setUserInfo }) {

  let { headers } = useContext(CartContext);

  let navigate = useNavigate();

  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState('')

  let validationSchema = Yup.object({
    // email: Yup.string().required('email is required').email('email is not valid'),
    username: Yup.string().required('name is required').min(3, 'at least 3 characters').max(10, 'maximum is 10 characters'),
    password: Yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'),
  })


  async function handleLogin(values) {
    setisloading(true)
    let { data } = await axios.post('https://dummyjson.com/auth/login', values, { headers })
      .catch((errr) => { setisloading(false); setmessageError(`${errr.response.data.message}`); })
    if (messageError !== '[object Object]') {
      localStorage.setItem('dataToken', data.token)
      localStorage.setItem('userId', JSON.stringify(data.id))
      localStorage.setItem('userInfo', JSON.stringify(data))
      saveUserData();
      setisloading(false)
      navigate('/')
      console.log(data);
    } else {
      navigate('/login')
      setisloading(false)

    }
  }


  let formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  })

  return <>

    <Helmet>
      <title>Login</title>
    </Helmet>

    <div className="container">
      <div className=" m-auto py-4 w-75">
        <div>
          <h2 className='py-3 text-success'>LogIn Now :</h2>
        </div>

        {messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null}

        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="username">UserName :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} type="username" name='username' id='username' className='form-control mb-2 ' />
          {formik.errors.username && formik.touched.username ? <div className='alert alert-danger'>{formik.errors.username}</div> : null}

          <label htmlFor="password">Password :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' className='form-control mb-2 ' />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

          {isloading ? <button type='button' className="btn btn-success  my-3"><i className='fas fa-spinner fa-spin'></i></button> :
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn btn-success my-3">Login</button>}

        </form>


        <hr />
        <div className="text-center h5">You Don't have an account?
          <Link to={'/register'} className='px-2 fw-bolder'>
            SignUp
          </Link>
        </div>
        <hr />
      </div>
        <div className=' m-5'>
          <div className='h4 '>To Have Access Enter :</div>
          <ul >
            <li>username: <span className='fw-bolder px-2'>atuny0</span> </li>
            <li>password: <span className='fw-bolder px-2'>9uQFF1Lh</span> </li>
          </ul>
        </div>

    </div >
  </>
}
