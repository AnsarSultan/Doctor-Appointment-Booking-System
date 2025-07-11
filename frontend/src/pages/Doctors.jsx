import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter , setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-indigo-500 text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=>{speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-50 text-black" : "" }`}>General physician</p>
          <p onClick={()=>{speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-50 text-black" : "" }`}>Gynecologist</p>
          <p onClick={()=>{speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-50 text-black" : "" }`}>Dermatologist</p>
          <p onClick={()=>{speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-50 text-black" : "" }`}>Pediatricians</p>
          <p onClick={()=>{speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-50 text-black" : "" }`}>Neurologist</p>
          <p onClick={()=>{speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-50 text-black" : "" }`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50 w-full h-auto object-cover" src={item.image} alt="" />
              <div className="p-4">
               {
                item.available ?
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              :
              <div className="flex items-center gap-2 text-sm text-center text-gray-400">
              <p className="w-2 h-2 bg-gray-400 rounded-full"></p>
              <p>Not Available</p>
            </div>
               }
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
