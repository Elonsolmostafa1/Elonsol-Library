import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import AppLogo from '../AppLogo/AppLogo';
import Lottie from 'lottie-web';

export default function SignUp() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errList, setErrList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("sucess");


  let navigate = useNavigate();

  function getUserData(e) {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
    console.log(user)
  }

  async function sendRegisterDataToAPI() {
        
    setLoading(true);
    let { data } = await axios.post("http://localhost:5000/user/signup",user);
    setLoading(false);
    console.log(data);

    if (data.message === "success") {
      setError("sucess");
      navigate("/login");
    } else {
      setError(data.message);
    }
  }

  function validateRegisterationData() {
    
     const signUpSchema = Joi.object({
              name:Joi.string().min(3).max(20).required(),
              email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
              phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
              password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
              confirmPassword: Joi.ref('password'),
      })
    return signUpSchema.validate(user, { abortEarly: false });
  }

  function submitRegisterationForm(e) {
    e.preventDefault();
    let validation = validateRegisterationData();
    if (validation.error) {
      setLoading(false);
      setErrList(validation.error.details);
      console.log(errList)
    } else {
      sendRegisterDataToAPI();
      console.log(user);
    }
  }


  const imgContainer = useRef(null)

  useEffect(() => {
    const container = imgContainer.current;
    if (!container) return;

    const anim = Lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./../../images/book1.json'),
    });

    return () => {
      anim.destroy();
    };
  }, []);


  return (
    <>
    <li className="fixed-top p-1 pe-lg-5 d-lg-flex d-none  ">
        <AppLogo/>
    </li>
    <div className="container">
      <div className="row">
        <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          <div className='w-100' ref={imgContainer}></div>
        </div>
        <div className="col-lg-7">
        <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
        <div className='bg-light bg-opacity-25 shadow-lg w-95 mx-auto p-5 rounded-2'>
            <h1 className='fw-bold'>Sign Up Now</h1>
            <div className='pt-3'>
            <form onSubmit={submitRegisterationForm}>
              <input onChange={getUserData} className='form-control my-2' type="text" name='name' placeholder='Enter Your Name' />
              {errList.filter((err) => err.context.label === "name")[0] ? (<div className="text-danger text-start pb-1 fs-small">
              {errList.filter((err) => err.context.label === "name")[0]?.message}</div>) : null}
              <input onChange={getUserData} className='form-control my-2' type="email" name='email' placeholder='Enter Your Email' />
              {errList.filter((err) => err.context.label === "email")[0] ? (<div className="text-danger text-start pb-1 fs-small">
              {errList.filter((err) => err.context.label === "email")[0]?.message}</div>) : null}
              <input onChange={getUserData} className='form-control my-2' type="password" name='password' placeholder='Enter Your Password' />
              {errList.filter((err) => err.context.label === "password")[0] ? (<div className="text-danger text-start pb-1 fs-small">
              {"Invalid password. Password min length 8 , min 1 letter and 1 number"}</div>) : null}
              <input onChange={getUserData} className='form-control my-2' type="text" name='phone' placeholder='Enter Your Phone' />
              {errList.filter((err) => err.context.label === "phone")[0] ? (<div className="text-danger text-start pb-1 fs-small">
              {"Invalid phone number"}</div>) : null}
              <button className='btn btn-danger text-light w-100 rounded-2 mt-2'> Sign Up</button>
              <p className='pt-2'>Already have account? <Link className='text-black' to='/login'>Login Now</Link></p>
            </form>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>

    {loading ? <Loading /> : null}
    </>
   
  )
}
