import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Lottie from 'lottie-web';
import {motion} from "framer-motion"

export default function AddBook() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [error,setError] = useState(false)
    const [photo, setPhoto] = useState(null);
  

  


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('publisher', publisher);
      formData.append('path', photo);
  
      try {
        const response = await axios.post('http://localhost:5000/book', formData , {
            headers: {
              token: localStorage.getItem('userToken')
            },
          });
        console.log(response);
        if(response.data?.message === "success")
        {
            setError(true)
            document.getElementById('title').value = ''
            document.getElementById('photo').value = ''
        }
      } catch (error) {
        console.log(error);
      }
    };

    const imgContainer = useRef(null)

  useEffect(() => {
    const container = imgContainer.current;
    if (!container) return;

    const anim = Lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./../../images/addBook.json'),
    });

    return () => {
      anim.destroy();
    };
  }, []);


  return (
    <>
    <div className='overflow-hidden'>
      <div className="row">
        <div className="col-2">
            <div className='position-fixed col-lg-2'>
                <Sidebar/>
            </div>
        </div>


        <div className="col-md-10  d-flex justify-content-center align-items-center min-vh-100">
            
          <motion.div initial={{y:-1000}} animate={{y:0}} transition={{duration:1.5, type:'spring'}} className='p-5 w-75 text-center bg-white bg-opacity-25 my-2 shadow rounded-2'>
          <div className='w-25 mx-auto' ref={imgContainer}></div>
            <p className='fw-bold fs-5'>Enter Book Details Now ....</p>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setPhoto(e.target.files[0])} type="file" className='form-control my-2' id='photo' name='path' placeholder='Choose Your Photo' />
                <input onChange={(e) => setName(e.target.value)} type="text" className='form-control my-2' id='name' name='name' placeholder='Enter Book Name' />
                <input onChange={(e) => setCategory(e.target.value)} type="text" className='form-control my-2' id='category' name='category' placeholder='Enter Book Category' />
                <input onChange={(e) => setPublisher(e.target.value)} type="text" className='form-control my-2' id='publisher' name='publisher' placeholder='Enter Book Author' />
                <button className=' btn btn-danger w-100 rounded-2 text-light'>Add Book</button>
            </form>
            {error? <div className='my-3 alert alert-success'>Book added successfully</div>:null}
          </motion.div>
        </div>
        
    </div>
    </div>
    </>
  )

}
