import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

function DoctorAppointment() {
  const {dToken , appointments , setAppointments , getAppointments} = useContext(DoctorContext)
  useEffect(()=>{
    if(dToken){
      getAppointments()
    }
  },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment