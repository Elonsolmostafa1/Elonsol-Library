import React, { useContext, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import issuedImg from '../../images/issued.png'
import issuedImg1 from '../../images/issue1.png'
import { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Profile() {

  return (
    <>
    <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 ">
            
            <div className="row align-items-center min-vh-100 ">
                <div className="col-lg-6 px-5">
                    <Link className='text-decoration-none text-black' to={`/nonReturnedBooks`}>
                        <motion.div initial={{scale:0}} animate={{backgroundColor:'#ccd3ea',scale:1}} 
                          transition={{duration:0.3}} className=' book-item rounded shadow-sm mouse-pointer '>
                            <img className='profile-img-upload mx-auto d-block' src={issuedImg} alt="" />
                            <p className='text-center pb-5 fs-3 fw-bold'>Non Returned Books</p>
                        </motion.div>
                    </Link>
                </div>
                <div className="col-lg-6 px-5">
                <Link className='text-decoration-none text-black' to={`/issuedBooks`}>
                    <motion.div initial={{scale:0}} animate={{scale:1}} 
                      transition={{delay:0.3,duration:0.3}} className='bg-custom-blue book-item rounded shadow-sm mouse-pointer '>
                        <img className='profile-img-upload mx-auto d-block' src={issuedImg1} alt="" />
                        <p className='text-center pb-5 fs-3 fw-bold'>Issued Books</p>

                    </motion.div>
                </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
