import { commonAPI } from "./commonApi"
import SERVER_URL from "./serverUrl"

// register Api
export const registerAPI = async (user) =>{
return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

// login Api

export const loginAPI = async(user) =>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

// add-project api
export const addProjectAPI = async (reqBody,reqHeader) =>{
  return  await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// get Home Project
export const getHomeProjectAPI = async () =>{
  return  await commonAPI("GET",`${SERVER_URL}/get-home-project`,"","")
}

// get All ProjectsAPI
export const getAllProjectAPI = async (searchKey,reqHeader) =>{
  return  await commonAPI("GET",`${SERVER_URL}/get-all-project?search=${searchKey}`,"",reqHeader)
}

// get User Project
export const getUserProjectAPI = async (reqHeader) =>{
  return  await commonAPI("GET",`${SERVER_URL}/get-user-project`,"",reqHeader)
}

// user/edit

export const  updateUserProfileAPI = async(reqBody,reqHeader) =>{
  return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

// project/edit/
export const updateProjectApi = async (projectId,reqBody,reqHeader) =>{
  return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// remove project
export const deleteProjectAPI = async (projectId,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
}