import React, { useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Footer from '../../components/Footer'
import Module from '../../components/Tutor/Module';
import SavedModule from '../../components/Tutor/SavedModule';
import axiosInstance from '../../axios/axiosConfig';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FaXmark } from 'react-icons/fa6';

function AddModule() {
  const [modules, setModules] = useState([]);
  const [moduleButton, setModuleButton] = useState(true)
  const course = parseInt(localStorage.getItem("courseDetails"));

  const handleModuleButton = (bool)=>{
    console.log(
      "Callback function executed.++++++++++++++++==================="
    );
    setModuleButton(bool)
    setModules([])
  }

  const getModules = 
    async () => {
       const response = await axiosInstance.get(
         "tutor/module/?course_id=" + course
       ); 
       if (response.status === 200) {
         return response.data;
       } else {
         throw new Error(response.statusText);
       }
     }

  // Fetch saved modules
  const moduleQuery = useQuery(['modules',course], getModules);

  // Create unsaved modules
  const createModule = (e)=>{
    e.preventDefault()
    console.log('create ,module')
    const newModule = (
      <div key={modules.length} className="flex flex-col">
        <div
          onClick={() => deleteModule(modules.length)}
          className="flex ml-auto mr-4 items-center"
        >
          <FaXmark className="text-xl" />
        </div>
        <Module moduleButton={moduleButton} onChange={handleModuleButton} />
      </div>
    );
    setModules([...modules, newModule]);
    console.log(modules, '======', 'newModule')
    setModuleButton(false)
  }

  // Delete unsaved modules
  const deleteModule = (key) => {
    setModules((prevModules) =>
      prevModules.filter((_, index) => index !== key)
    );
    setModuleButton(true)
  };
    
  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-[#e6e6e6]">
        <div className="container pt-20 p-14 lg:w-2/3">
          <h1 className="font-bold font-serif text-4xl">Add Modules</h1>
          <div className="shadow-xl p-4">
            <div className="p">
              <ul>
                {moduleQuery.data?.map((module,index) => (
                  <SavedModule key={index} index={index} module={module}/>
                ))}
              </ul>
              <div>
                <div>{modules.map((module) => module)}</div>
              </div>
            </div>
            {moduleButton && (
              <button
                type="submit"
                onClick={createModule}
                className="rounded-full flex justify-center items-center gap-1 bg-emerald-500 px-4 -mt-2 font-bold"
              >
                <span className="text-3xl pb-1 font-bold">+</span> Module
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddModule