

// import SERVER_URL from './server_url'
// import commonAPI from './commonAPI'

// export const registerAPI=async(reqBody)=>{
//    return await  commonAPI("POST",`${SERVER_URL}/register`,reqBody)
// }

// export const userLoginAPI=async(reqBody)=>{
//  return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
// }

// // To add project API
// export const AddProjectAPI=async(reqBody,reqHeader)=>{
//  return  await  commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
// }

// // api call for home project display

// export const getHomeprojectAPI=async()=>{
//  return await commonAPI('GET',`${SERVER_URL}/get-home-project`,"")
// }
// // apicall for all projects
// export const getAllprojectAPI=async(reqHeader)=>{
//  return await commonAPI('GET',`${SERVER_URL}/get-all-project`,"",reqHeader)
// }

// // api call for get user project
// export const getUserprojectAPI=async(reqHeader)=>{
//  return await commonAPI('GET',`${SERVER_URL}/get-user-project`,"",reqHeader)
// }

// // api callfor edit user roject
// export const UpdateProjectAPI=async(pid,reqBody,reqHeader)=>{
//    return await commonAPI('PUT',`${SERVER_URL}/edit-project/${pid}`,reqBody,reqHeader)

// }

// // api callfor deleteprojects
// export const deleteProjectAPI=async(pid,reqHeader)=>{
//  return await commonAPI("DELETE",`${SERVER_URL}/delete-project/${pid}`,{},reqHeader)
// }


import SERVER_URL from './server_url';
import commonAPI from './commonAPI';

export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
};

export const userLoginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, reqBody);
};

export const AddProjectAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${SERVER_URL}/add-project`, reqBody, reqHeader);
};

export const getHomeprojectAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/get-home-project`);
};

export const getAllprojectAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/get-all-project`, null, reqHeader);
};

export const getUserprojectAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/get-user-project`, null, reqHeader);
};

export const UpdateProjectAPI = async (pid, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/edit-project/${pid}`, reqBody, reqHeader);
};

export const deleteProjectAPI = async (pid, reqHeader) => {
  return await commonAPI("DELETE", `${SERVER_URL}/delete-project/${pid}`, undefined, reqHeader);
};

