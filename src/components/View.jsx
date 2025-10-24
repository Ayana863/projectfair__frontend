
import React, { useContext, useEffect, useState } from 'react';
import ProjectAdd from './ProjectAdd';
import Edit from './Edit';
import { deleteProjectAPI, getUserprojectAPI } from '../../Serveices/allAPI';
import { addResponseContext, editResponseContext } from '../Context/ContexApi';





function View() {
  const{addResponse,setAddResponse}=useContext(addResponseContext)
  const{editResponse,setEditResponse}=useContext(editResponseContext)
  const [getUserProject, setGetUserProject] = useState([]);

  useEffect(() => {
    userProject();
  }, [addResponse,editResponse]);

  const userProject = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      };

      try {
        const result = await getUserprojectAPI(reqHeader);
        if (result.status === 200) {
          setGetUserProject(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };



  const handleDelete=async(pid)=>{
    //  to create reqheader 
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
         "content-type":"application/json",
         "authorization":`Bearer ${token}`
      }
    try{
 
        const result= await deleteProjectAPI(pid,reqHeader)
       userProject(result.data)
      

    }catch(err){
      console.log(err);
      
    }
      
      
   
  }
}

  return (
    <>
      {/* Title & Add Project Button */}
      <div className='d-flex align-items-center gap-3 mt-5 ms-5'>
        <h3 className='text-primary'>All Projects</h3>
        <ProjectAdd />
      </div>

      {/* Project List */}
      {
        getUserProject?.length > 0 &&
        getUserProject.map((project, index) => (
          <div key={index} className="row justify-content-between mt-3">
            <div className="col-md-8" style={{ maxWidth: '700px' }}>
              <div className="border rounded shadow p-3 d-flex justify-content-between align-items-center flex-wrap">
                {/* Project Title */}
                <h5 className="mb-0">{project.title}</h5>

                {/* edit Icons */}
                <div className="d-flex align-items-center gap-4">
                  <Edit project={project} />

                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn p-0">
                    <i className="fa-brands fa-github fs-5"></i>
                  </a>

                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="btn p-0">
                    <i className="fa-solid fa-globe fs-5"></i>
                  </a>

                  <button onClick={()=>handleDelete(project?._id)} className="btn p-0">
                    <i className="fa-solid fa-trash text-danger fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      
    </>
  );
}

export default View;


