import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../AppLogo/AppLogo';
import Loading from '../Loading/Loading';
import lottie from "lottie-web"


export default function Login() {

  const imgContainer = useRef(null)
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [errList, setErrList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("success");

  let navigate = useNavigate();

  function getUserData(e) {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
    console.log(user)
  }

  async function sendRegisterDataToAPI() {
    
    setLoading(true);
    let { data } = await axios.post("http://localhost:5000/user/signin",user);
    setLoading(false);
    console.log(data);

    if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
      setError("success");
      navigate("/home");
    } else {
      setError(data.message);
    }
  }

  function validateLoginData() {
    let schema = Joi.object({
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
  })
    
    return schema.validate(user, { abortEarly: false });
  }

  function submitLoginForm(e) {
    //setLoading(true);
    e.preventDefault();
    let validation = validateLoginData();
    if (validation.error) {
      setLoading(false);
      setErrList(validation.error.details);
      console.log(errList)
    } else {
      sendRegisterDataToAPI();
    }
  }

  useEffect(() => {
    const container = imgContainer.current;
    if (!container) return;

    const anim = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./../../images/book.json'),
    });

    return () => {
      anim.destroy();
    };
  }, []);



  return (<>
    <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <AppLogo/>
    </li>
    <div className="container">
      <div className="row">
        <div className="min-vh-100 col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          <div className='w-100' ref={imgContainer}> </div>
        </div>
        <div className="col-lg-7">
        <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
        <div className='bg-light bg-opacity-25 shadow-lg w-95 mx-auto p-5 rounded-2'>
            <h1 className='fw-bold'>Login Now</h1>
            <div className='pt-3'>
            <form onSubmit={submitLoginForm}>
              <input onChange={getUserData} className='form-control my-2' type="email" name='email' placeholder='Enter Your Email' />
              {errList.filter((err) => err.context.label === "email")[0] ? (<div className="text-danger text-start pb-1 fs-small">
              {errList.filter((err) => err.context.label === "email")[0]?.message}</div>) : null}
              <input onChange={getUserData} className='form-control my-2' type="password" name='password' placeholder='Enter Your Password' />
              {errList.filter((err) => err.context.label === "password")[0] ? (<div className="text-danger text-start pb-1 fs-small">
              {"Invalid password. Password min length 8 , min 1 letter and 1 number"}</div>) : null}
              <button className='btn btn-danger text-light w-100 rounded-2 mt-2'> Login</button>
              <div className=" py-2">
              <p className='my-0'>Don't have account? <Link className='text-decoration-none text-black fw-semibold text-decoration-underline' to='/'>Sign Up Now</Link></p>            
              </div>
              </form>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>
    {loading ? <Loading/> : null}

    </>
    
  )
}
