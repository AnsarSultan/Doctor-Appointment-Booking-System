import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props)=>{
    const [aToken,setAToken] = useState(localStorage.getItem('aToken') || '')
    const [doctors , setDoctors] = useState([])
    const [loadingDoctors , setLoadingDoctors] = useState(false);
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () =>{
        try {
            setLoadingDoctors(true)
            const {data} = await axios.get(backendURL + '/api/admin/all-doctors' ,  {headers: {aToken}})
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
              
            }
        } catch (error) {
            toast.error(error.message)
        }finally {
            setLoadingDoctors(false);
          }
    }

    const changeAvailablity = async (docId)=>{
        try {
            const {data} = await axios.post(backendURL + '/api/admin/change-availablity', {docId} , {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken , setAToken,
        backendURL, doctors, loadingDoctors, getAllDoctors , changeAvailablity
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider