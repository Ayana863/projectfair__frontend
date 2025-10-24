import React from 'react'
import { useState } from 'react';
import prof from '../assets/profile.png'

import Collapse from 'react-bootstrap/Collapse';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
   <>
   <div className='d-flex justify-content-evenly '>
  <h2 className='fw-bold'>Profile</h2>
  <button  className='btn text-primary'  onClick={() => setOpen(!open)}><i className='fa-solid fa-chevron-down'></i></button>
</div>
<Collapse in={open}>
        <div  id="row align-items-center justify-content-center shadow border border-white rounded p-2  example-collapse-text">
            {/* */}

<label>
 <img  style={{marginLeft:200,marginTop:20}} width={250} src={prof} alt="" />
 <input type="file" style={{display:'none'}} />
</label>

<div className='mb-3 mt-5 ' style={{width:400,marginLeft:120}}>
  <input type="text" className='form-control' placeholder='github url' />
</div>

<div className='mb-3' style={{width:400,marginLeft:120}}>
  <input type="text" className='form-control' placeholder='linkedin url' />
</div>
<div className='mb-3 fw-100' style={{marginLeft:230}}> 
  <button style={{width: '200px'}} className='btn btn-primary' >Update Profile</button>
</div>


        </div>
      </Collapse>
   
   </>
  )
}


export default Profile


