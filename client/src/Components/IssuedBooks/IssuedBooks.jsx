import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import {motion} from "framer-motion"
export default function IssuedBooks() {
    const[allBooks,setAllBooks] = useState('')
    const[bookId,setBookId] = useState('')

    async function getDataFromURL() {
        let {data} = await axios.get('http://localhost:5000/book/issue', {
          headers: {
            token: localStorage.getItem('userToken')
          },
        });
        setAllBooks(data.issuedBooks);
      }


      useEffect(() => {getDataFromURL();}, []);

  return (
    <>
    
    <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-5 ps-0 ps-lg-5 my-1 ">
            <div className='text-center mt-5 mb-2'>
            <motion.h2 initial={{y:-100}} animate={{y:0}} transition={{delay:0.5,duration:1}} className='fw-bold p-3'>All Issued Books</motion.h2>
            </div>
            
           <motion.table initial={{opacity:0}} animate={{opacity:1}} 
            transition={{duration:1}} className='table border border-2 border-opacity-50 border-secondary text-center table-striped border table-hover table-responsive' border="">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Issue Date</th>
                    <th>Returned Date</th>
                    </tr>
                </thead>
                <tbody>{(allBooks?.length)? allBooks && allBooks.map((book,index)=>(<motion.tr initial={{scale:0}}
                    animate={{scale:1}} transition={{duration:index*0.2 || 0.2}} key={book._id}>
                        <td>{index+1}</td>
                        <td>{book.name}</td>
                        <td>{book.category}</td>
                        <td>{book.issueDate.substring(0,10)}</td>
                        <td>{book.returnDate.substring(0,10)}</td>
                        </motion.tr>)):<tr><td className='fw-bold' colSpan={5}>No Issued Books Found</td> </tr>}
                </tbody>
           </motion.table>
          </div>
        </div>
      </div>
    
    </>
  )
}
