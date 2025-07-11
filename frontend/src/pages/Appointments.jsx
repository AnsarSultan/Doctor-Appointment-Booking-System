import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Appointments () {
  const {docId} = useParams();
  const {doctors , currencySymbol , backendUrl , token , getDoctorsData} = useContext(AppContext);
  const daysOfWeek = ['SUN' , 'MON', 'TUE', 'WED', 'THU' , 'FRI' , 'SAT']
  const [docInfo , setDocInfo] = useState(null)
  const navigate = useNavigate()

  const [docSlot , setDocSlot] = useState([]);
  const [slotIndex , setSlotIndex] = useState(0);
  const [slotTime , setSlotTime] = useState("");

  // const getAvailbleSlots = async () => {
  //   setDocSlot([])

  //   let today = new Date();

  //   for(let i = 0 ; i<7 ; i++){
  //     let currentDate = new Date(today);
  //     currentDate.setDate(today.getDate()+i);

  //     let endTime = new Date();
  //     endTime.setDate(today.getDate()+i);
  //     endTime.setHours(21,0,0,0)

  //     if(today.getDate() === currentDate.getDate()){
  //       currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
  //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0 )
  //     }else{
  //       currentDate.setHours(10);
  //       currentDate.setMinutes(0);
  //     }

  //     let timeSlots = [];
  //     while(currentDate < endTime){
  //       let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  //       timeSlots.push({
  //         dateTime : new Date(currentDate),
  //         time: formattedTime
  //       })
  //       currentDate.setMinutes(currentDate.getMinutes() + 30)
  //     }
  //     setDocSlot(prev => ([...prev, timeSlots]))
  //   }
  // }
  const getAvailbleSlots = async () => {
    setDocSlot([]);
  
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
  
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
  
        // ✅ FILTER: Only include time if it's not booked
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let slotDate = `${day}_${month}_${year}`;
  
        const isBooked =
          docInfo?.slots_booked?.[slotDate]?.includes(formattedTime) || false;
  
        if (!isBooked) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      // Only push if there are available time slots for that day
      if (timeSlots.length > 0) {
        setDocSlot((prev) => [...prev, timeSlots]);
      }
    }
  };
  

  const fetchDocInfo = async () =>{
    const doctorInfo = doctors.find(doc => doc._id === docId )
    setDocInfo(doctorInfo)
  }

  const bookAppointment = async ()=>{
    
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    if (!slotTime) {
      toast.warn('Please select a time slot');
      return;
    }

    try {
      const date = docSlot[slotIndex][0].dateTime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day +'_' +  month + '_' + year
    
      const {data } = await axios.post(backendUrl + '/api/user/book-appointment' , {docId , slotDate , slotTime}, {headers: {token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    fetchDocInfo();
  },[doctors, docId])

  useEffect(()=>{
    getAvailbleSlots();
  },[docInfo])
  useEffect(()=>{
    console.log(docSlot)
  },[docSlot])
    return docInfo && (
      <div>
        <div className='flex flex-col sm:flex-row gap-4'> 
          <div>
            <img className='bg-indigo-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="doctor image" />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 tex-2xl font-medium text-gray-900'>{docInfo.name}
             <img className='w-5' src={assets.verified_icon} alt="" /></p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>

            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900  mt-3'>About <img src={assets.info_icon} alt="" /></p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>
        {
          <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
            <p>Available Booking slots</p>
            <div className='flex gap-3 items-center w-full overflow-x-scroll no-scrollbar mt-4'>
              {docSlot.length && docSlot.map((item , index)=>(
                <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-indigo-500 text-white' : 'border border-gray-200'}`} key={index}>
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
            </div>
            <div className='flex items-center gap-3 w-full overflow-x-scroll no-scrollbar mt-4'>
              {docSlot.length && docSlot[slotIndex].map((item , index)=>(
                <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-indigo-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
              ))}
            </div>
            <button onClick={bookAppointment} className='bg-indigo-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an appointment</button>
          </div>
        }
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}></RelatedDoctors>
      </div>
    )
  }