import React from 'react'
import CornerRibbon from "react-corner-ribbon";
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"


export default function BookItem(probs) {

    const {_id,name,category,publisher,bookPhoto , isIssued} = probs
    
  return (
    <>
    <div className="col-lg-3 col-md-4 col-sm-6 my-3 ">
                <Link className='text-decoration-none text-black' to={`/book/${_id}`}>
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.7}} className='book-item p-3 text-center bg-light bg-opacity-25 rounded-2 shadow-sm me-4 me-md-0 mouse-pointer position-relative'>
                        {isIssued? <CornerRibbon position="top-right" fontColor="#f0f0f0" backgroundColor="#951111" 
                        style={{"fontSize":"12px"}} >ISSUED BOOK</CornerRibbon>:null}
                        <div className='book-fixed-height overflow-hidden mx-auto'>
                            <img className='w-100' src={`http://localhost:5000/${bookPhoto}`} alt="" />
                        </div>
                        <h5 className='mb-0 mt-2'>{name}</h5>
                        <p className='py-0 my-0 text-secondary fw-lighter fs-7'>{publisher}</p>
                    </motion.div>
                </Link>
    </div>
    </>
  )
}
