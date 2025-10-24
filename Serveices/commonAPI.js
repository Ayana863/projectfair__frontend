// import axios from 'axios'

// const commonAPI=async(httpMethod,url,reqBody,reqHeader)=>{

//     const reqConfig=({
//         method:httpMethod,
//         url,
//        data:reqBody,
//        headers:reqHeader?reqHeader:{"content_type":"application/json"}
//     })

//   return await  axios(reqConfig).then(res=>{
//         return res
//     }).catch(err=>{
//         return err
//     })
    
// }
// export default commonAPI


import axios from 'axios';

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  };

  return await axios(reqConfig)
    .then(res => res)
    .catch(err => err);
};

export default commonAPI;
