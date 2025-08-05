import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext.jsx';

export default function Login() {
  const [state , setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAToken , backendURL} = useContext(AdminContext);
  const {setDtoken } = useContext(DoctorContext)
  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendURL + '/api/admin/login' , {email,password})
        if(data.success){
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          localStorage.removeItem('dToken')
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendURL+ '/api/doctor/login', {email , password})
        if(data.success){
          localStorage.setItem('dToken', data.token)
          setDtoken(data.token)
          localStorage.removeItem('aToken')
        }else{
          toast.error(data.message)
        }

      }
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-indigo-500'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
        </div>
        <button className='bg-indigo-500 text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
        {
          state === 'Admin' ?
          <p>Doctor Login? <span onClick={()=> setState('Doctor')} className='text-indigo-500 underline cursor-pointer'>Click here</span></p> :
          <p>Admin Login? <span onClick={()=> setState('Admin')} className='text-indigo-500 underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

