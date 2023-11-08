import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { FaFile, FaPen, FaTrash, FaVideo } from 'react-icons/fa6';
import axiosInstance from '../../axios/axiosConfig';

function Lecture({ onChange,module }) {
  const [chapterName, setChapterName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [notesName, setNotesName] = useState("");
  const [notes, setNotes] = useState([]);
  const [video, setVideo] = useState([]);

  const generateError = (err) => toast.error(err, { position: "top-center" });

  const handleVideoFile = (e) => {
    const file = e.target.files[0];
    setVideo(file)
    if (file) {
      setLectureName(file.name);
    }
  };

  const handleNotes = (e) => {
    const file = e.target.files[0];
    setNotes(file)
    if (file) {
      setNotesName(file.name);
    }
  };

  // Creating new chapters
  const queryClient = useQueryClient();

  const chapterMutation = useMutation(addChapter, {
    onSuccess: () => {
      setChapterName("");
      setLectureName("");
      setNotesName("");
      console.log(" chapterMutation ok ++++++++++==============");
      onChange(true);
    },
    onError: (error) => {},
  });

  async function addChapter() {
    const response = await axiosInstance.post(
      "tutor/chapter/?module_id=" + module.id,
      {
        module: module.id,
        title: chapterName,
        video,
        pdf: notes,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.status == 201) {
      console.log(response.data,'+++++=======')
      queryClient.setQueriesData("chapters", (old) => {
         return [...old, response.data];
        });
    } else {
      console.log("eroorrr ocureed add module", response);
      throw new Error(response.statusText);
    }
  }
  const saveChapter = (e) => {
    e.preventDefault();
    if (!chapterName.trim()) {
      generateError("Please enter the chapter name");
      return;
    }

    chapterMutation.mutate();
  };

  return (
    <>
      <div className="flex border-black shadow shadow-slate-700 p-2 mb-4 flex-col gap-3">
        <Toaster/>
        <div className="flex justify-between mr-4">
          <h3 className="font-bold">Chapter </h3>
          {/* <div className="flex items-end mr-2 text-sm">
            <FaPen className="ml-2 mr-4" />
            <FaTrash />
          </div> */}
        </div>
        <input
          className="border rounded h-10 border-black px-2"
          type="text"
          name="lectureTitle"
          onChange={(e)=>setChapterName(e.target.value)}
          placeholder="Add chapter name"
        />
        <div className="grid grid-cols-2 gap-2 justify-between">
          <div className="relative">
            <input
              className="opacity-0 relative z-10"
              onChange={handleVideoFile}
              type="file"
              accept="video/*"
              name="lectureVideo"
              placeholder=""
            />
            <div className="absolute rounded truncate top-0 border border-black w-full px-3">
              {lectureName ? (
                lectureName
              ) : (
                <span className="flex items-center gap-2">
                  <FaVideo />
                  Add Lecture
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              className="opacity-0 relative z-10"
              onChange={handleNotes}
              type="file"
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              name="lectureNote"
              placeholder=""
            />
            <div className="absolute rounded top-0 border border-black w-full px-3">
              {notesName ? (
                notesName
              ) : (
                <span className="flex items-center gap-2">
                  <FaFile />
                  Add Notes
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            onClick={saveChapter}
            className="bg-black text-white text-center text-base px-4 py-2 font-bold  cursor-pointer"
          >
            Save Chapter
          </button>
        </div>
      </div>
    </>
  );
}

export default Lecture