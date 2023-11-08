import React from "react";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Lecture from "./Lecture";
import { Toaster, toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../axios/axiosConfig";

function Module({ moduleButton, module, onChange,title }) {

  const [lectures, setLectures] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [lectureButton, setLectureButton] = useState(true);

  const course = parseInt(localStorage.getItem("courseDetails"));

  const generateError = (err) => toast.error(err, { position: "top-center" });

  const createLecture = (e) => {
    e.preventDefault();

    // Creating unsaved lecture
    const newLecture = (
      <div key={lectures.length} className="flex flex-col">
        <div
          onClick={() => deleteChapter(lectures.length)}
          className="flex ml-auto mr-2 mb-2 items-center"
        >
          <FaXmark className="text-xl" />
        </div>
        <Lecture key={lectures.length} lectureButton={lectureButton} />
      </div>
    );

    setLectures([...lectures, newLecture]);
    setLectureButton(false);
  };

  // Deleting unsaved chapters
  const deleteChapter = (key) => {
    setLectures((prevModules) =>
      prevModules.filter((_, index) => index !== key)
    );
    setLectureButton(true);
    onChange(true)
  };


  // Creating new modules
  const queryClient = useQueryClient();

  const mutation = useMutation(addModule, {
    onSuccess: () => {
      setModuleName("");
      console.log('first Working')
      onChange(true);
    },
    onError: (error) => {},
  });

  async function addModule() {
    const response = await axiosInstance.post("tutor/module/", {
      course,
      title: moduleName,
    });
    if (response.status == 201) {
      console.log('im working')
      queryClient.setQueriesData("modules", (old) => {
        console.log('im modules')
        return [...old, response.data]});
    } else {
      console.log("eroorrr ocureed add module");
      throw new Error(response.statusText);
    }
  }

  const saveModule = (e) => {
    e.preventDefault();
    if (!moduleName.trim()) {
      generateError("Please enter the module name");
      return;
    }

    mutation.mutate();
  };


  // Editing saved modules
  const editMutation = useMutation(editModule, {
    onSuccess: () => {
      // setModuleName(""); 
      onChange(true,moduleName)
      console.log(' on change working++++++++++')
    },
    onError: (error) => {},
  });

  async function editModule() {
    const response = await axiosInstance.put(
      `tutor/module/${title.id}/?course_id=${title.course}`,
      {
        title: moduleName,
      }
    );
    if (response.status) {
      console.log(response,'[][][][][][][][][')
    } else {
      console.log("eroorrr ocureed add module");
      throw new Error(response.statusText);
    }
  }

  const editModuleSave = (e) => {
    e.preventDefault();
    if (!moduleName.trim()) {
      generateError("Please enter the module name");
      return;
    }

    editMutation.mutate();
  };

  return (
    <>
      
      <div className="border border-gray-300 shadow py-3 px-2 mt-3 mb-6">
        <Toaster />
        <form>
          <div className="flex border-b border-black justify-between">
            <div className="pb-1">
              <h3 className="font-bold text-xl">
                {module
                  ? `Module ${module.moduleNo}: ${module.title}`
                  : title
                  ? `Module ${title.moduleNo}: ${title.title}`
                  : "New module"}
              </h3>
            </div>
          </div>

          <div className="pt-3">{lectures.map((lecture) => lecture)}</div>
          <div className="text-xl mr-4 font-bold text-emerald-700">
            {!moduleButton & title ? (
              <div
                onClick={createLecture}
                className="flex justify-end cursor-pointer pb-3"
              >
                <span className="text-2xl">+</span>Lecture
              </div>
            ) : (
              <div className="grid grid-cols-2 py-3">
                <div className="flex items-center w-3/4 pl-3">
                  <input
                    className="pl-2 h-8 w-full font-thin text-lg border border-black rounded"
                    type="text"
                    name="moduleName"
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    placeholder="Add module name"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="submit"
                    onClick={!title ? saveModule : editModuleSave}
                    className="bg-black text-white text-center text-base px-4 py-2 font-bold  cursor-pointer"
                  >
                    {title ? "Save changes" : "Save Module"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      
    </>
  );
}

export default Module;
