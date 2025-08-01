import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {
  const {doctors , aToken , getAllDoctors , loadingDoctors , changeAvailablity} = useContext(AdminContext)
  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex justify-center flex-wrap gap-4 pt-5 gap-y-6'>
        {
          loadingDoctors ? <p>Loading Doctors...</p> :
          doctors.map((item , index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-50 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-indigo-500 transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium '>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailablity(item._id)} type="checkbox" checked={item.available} name="" id="" />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList