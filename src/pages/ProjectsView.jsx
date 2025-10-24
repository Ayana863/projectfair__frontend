import React, { useEffect, useId, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllprojectAPI } from '../../Serveices/allAPI'





function ProjectsView() {

  const [getAllProjectsData,setGetAllProjectData]=useState([])
  console.log(getAllProjectsData);
  

  useEffect(() => {
  getAllProjects()
  }, [])
  
const getAllProjects=async()=>{
  
     const token=sessionStorage.getItem("token")
     if(token){
         const  reqHeader={
  // to hold content type and token
  "content-type":"application/json",
  "authorization":`Bearer ${token}`
 } 
  
 try{
     const result=await getAllprojectAPI(reqHeader)
     console.log(result);
     if(result.status==200){
      setGetAllProjectData(result.data)
     }
     
 }catch(err){
  console.log(err);
  
 }
 

     }
        
        
         
 
}
  return (
   <>
   <div className='row'>
    
         {
          getAllProjectsData?.length>0 &&
          getAllProjectsData?.map(project=>(
            <div className='col-lg-4 col-md-6 col-sm-12 '>
              
                 <ProjectCard Displaydata={project}/>

                </div>
          ))
         }
    </div>

 
 
   
   </>
  )
}

export default ProjectsView

