import React, { createContext, useState } from 'react'
 export  const addResponseContext=createContext()
 export const editResponseContext=createContext()

function ContexApi({children}) {
 
    // create state to store addproject respose
    const[addResponse,setAddResponse]=useState("")
    const [editResponse,setEditResponse]=useState("")
  return (
    <>
 <editResponseContext.Provider value={{editResponse,setEditResponse}}>
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
      {children}
    </addResponseContext.Provider>
 </editResponseContext.Provider>
    
    </>
  )
}

export default ContexApi