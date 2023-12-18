import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik'
import styles from './Register.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import {Helmet} from "react-helmet";

export default function Register() {
  let navigate = useNavigate();

  let { headers } = useContext(CartContext)
  const [loading, setloading] = useState(false)
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState('');

  async function handleRegister(values) {
    setisloading(true)
    let { data } = await axios.post('https://dummyjson.com/users/add', values, { headers })
    // .catch((errr) => {setmessageError('${errr.msg}') })
    if (data !== 'username or password is incorrect') {
      setisloading(false)
      navigate('/login')
    }
    console.log(data)
  }

  // function handleRegister(values) {
  //   return axios.post('https://dummyjson.com/users/add', values, { headers })
  //     .then((response) => response)
  //     .catch((err) => err)

  //   // console.log(values);
  //   // console.log();
  // }

  // async function submitUser(values) {
  //   setisloading(true)
  //   let response = await handleRegister(values)
  //   console.log(response)
  //   console.log(values)
  //   setisloading(false)
  // }

  let validationSchema = Yup.object({
    firstName: Yup.string().required('name is required').min(3, 'at least 3 characters').max(10, 'maximum is 10 characters'),
    lastName: Yup.string().required('name is required').min(3, 'at least 3 characters').max(10, 'maximum is 10 characters'),
    email: Yup.string().required('email is required').email('email is not valid'),
    password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Minimum eight characters, at least one letter, one number and one special character'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'password and rePassord does not match'),
    phone: Yup.string().required('phone is required').matches(/^(\+2)?01[0125][0-9]{8}$/, 'it is not egy number'),
  })
  //   const validate = values => {
  //     const errors = {};
  //     if (!values.name) {
  //       errors.name = 'Required';
  //     } else if (values.name.length > 5) {
  //       errors.name = 'Must be 5 characters or less';
  //     } else if (values.name.length > 10) {
  //       errors.name = 'Must be 10 characters or less';
  //     }

  //     if (!values.email) {
  //       errors.email = 'email Required';
  //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //       errors.email = 'Invalid email address';
  //     }

  //     if (!values.password) {
  //       errors.password = 'password Required'
  //     } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password)) {
  //       errors.password = 'password should be Minimum eight characters, at least one letter, one number and one special character'
  //     }

  //     if (!values.rePassword) {
  //       errors.rePassword = 'rePassword Required'
  //     } else if (values.rePassword !== values.password) {
  //       errors.rePassword = 'rePassword and password must be identical '
  //     }

  //     if (!values.phone) {
  //       errors.phone = 'phone Required'
  //     } else if (!/^(01)[0125]{9}/i.test(values.phone)) {
  //       errors.phone = 'it should be egyption phone number'
  //     }



  //   return errors;
  // };




  let formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister
  })

  return <>

    <Helmet>
      <title>SignUp</title>
    </Helmet>

    {loading ? <section id="loading">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </section> :



      <div className="container">
        <div className=" m-auto py-4 w-75">
          <h2 className='py-3 text-success'>SignUp Now :</h2>
          {messageError > 0 ? <div className="alert alert-danger">{messageError}</div> : null}
          <form onSubmit={formik.handleSubmit}>

            <label htmlFor="firstName">FirstName :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName} type="text" name='firstName' id='firstName' className='form-control mb-2 ' />
            {formik.errors.firstName && formik.touched.firstName ? <div className='alert alert-danger'>{formik.errors.firstName}</div> : null}

            <label htmlFor="lastName">LastName :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} type="text" name='lastName' id='lastName' className='form-control mb-2 ' />
            {formik.errors.lastName && formik.touched.lastName ? <div className='alert alert-danger'>{formik.errors.lastName}</div> : null}

            <label htmlFor="email">Email :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' className='form-control mb-2 ' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

            <label htmlFor="password">Password :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' className='form-control mb-2 ' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

            <label htmlFor="rePassword">Rewrite Password :</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control mb-2 ' />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}

            <label htmlFor="phone">Phone</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' className='form-control mb-2 ' />
            {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

            {isloading ? <button type='button' className="btn btn-success my-3"><i className='fas fa-spinner fa-spin'></i></button> :
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn btn-success my-3">Register</button>}


          </form>
          <hr />
          <div className="text-center h5">You already have an account?
            <Link to={'/login'} className='px-2 fw-bolder'>
              LogIn
            </Link>
          </div>
        </div>
      </div>
    }
  </>
}
