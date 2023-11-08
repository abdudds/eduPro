import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { FaPen, FaTrash, FaXmark } from 'react-icons/fa6';
import Lecture from './Lecture';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../axios/axiosConfig';
import Module from './Module';
import SavedLecture from './SavedLecture';

function SavedModule({module,index}) {
  const [lectureButton, setLectureButton] = useState(true);
  const [lectures, setLectures] = useState([]);
  const [showModule, setShowModule] = useState(true);
  const [localmodule, Setmodule] = useState(module);

  const handleShowModule = (bool,val) => {
    setShowModule(bool);
    Setmodule({ ...module, title: val });
  };

  const handleLectureButton = (bool) => {
    console.log(
      "Callback function executed.++++++++++++++++==================="
    );
    setLectureButton(bool);
    setLectures([]);
    console.log(lectures,'++++======lecture')
    // Setmodule({})
  };

  const getChapters = async () => {
    const response = await axiosInstance.get(
      "tutor/chapter/?module_id=" + module.id
    );
    if (response.status === 200) {
      console.log(response.data,'+++++++')
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  };

  // Fetch saved chapters
  const chapterQuery = useQuery(["chapters", module.id], getChapters);

  // Create unsaved lecture

  const createLecture = (e) => {
    e.preventDefault();
    const newLecture = (
      <div key={lectures.length} className="flex flex-col">
        <div
          onClick={() => deleteChapter(lectures.length)}
          className="flex ml-auto mr-2 mb-2 items-center"
        >
          <FaXmark className="text-xl" />
        </div>
        <Lecture
          key={lectures.length}
          onChange={handleLectureButton}
          module={module}
        />
      </div>
    );

    setLectures([...lectures, newLecture]);
    setLectureButton(false);
  };

  const deleteChapter = (key) => {
    setLectures((prevModules) =>
      prevModules.filter((_, index) => index !== key)
    );
    setLectureButton(true);
  };

  // Delete saved module

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteModule, {
    onSuccess: () => queryClient.invalidateQueries("modules"),
  });

  async function deleteModule(module) {
    const response = await axiosInstance.delete(
      `tutor/module/${module.id}/?course_id=${module.course}`
    );

    if (response.status) {
    } else {
      console.log("eroorrr ocureed add module");
      throw new Error(response.statusText);
    }
  }

  return (
    <>
      {showModule ? (
        <div className="border border-gray-300 shadow py-3 px-2 mt-3 mb-6">
          <Toaster />
          <form>
            {console.log(localmodule.title, '----------------')}
            <div className="border-b border-black">
              <div className="flex justify-between pb-1">
                <h3 className="font-bold text-xl">
                  {
                  module && `Module ${index + 1}: ${localmodule.title}`}
                </h3>
                <div className="flex justify-start mr-2 text-sm pt-2">
                  <FaPen
                    onClick={() => setShowModule(false)}
                    className="ml-2 mr-4"
                  />
                  <FaTrash onClick={() => mutation.mutate(module)} />
                </div>
              </div>
            </div>
            <ul>
              {chapterQuery.data
                ?.filter((chapter) => chapter.module === module.id)
                .map((chapter, index) => (
                  <SavedLecture key={index} index={index} chapter={chapter} />
                ))}
            </ul>
            <div className="pt-3">{lectures.map((lecture) => lecture)}</div>
            <div className="text-xl mr-4 font-bold text-emerald-700">
              {lectureButton && (
                <div
                  onClick={createLecture}
                  className="flex justify-end cursor-pointer pb-3"
                >
                  <span className="text-2xl">+</span>Lecture
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        <Module title={localmodule} onChange={handleShowModule} />
      )}
    </>
  );
}

export default SavedModule