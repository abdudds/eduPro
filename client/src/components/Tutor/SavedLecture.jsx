import React, { useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import { FaPen, FaTrash } from 'react-icons/fa6';

function SavedLecture(chapter) {
  // const [lecture, setLecture] = useState(chapter);

  return (
    <>
      <div className="flex border-black shadow shadow-slate-700 p-2 mt-4 flex-col gap-3">
        <Toaster />
        <div className="flex justify-between mr-4">
          <h3 className="font-bold">{`Chapter ${chapter.chapter.chapterNo}: ${chapter.chapter.title}`} </h3>
          <div className="flex items-end mr-2 text-sm">
            <FaPen className="ml-2 mr-4" />
            <FaTrash />
          </div>
        </div>
        {/* <input
          className="border rounded h-10 border-black px-2"
          type="text"
          name="lectureTitle"
          onChange={(e) => setChapterName(e.target.value)}
          placeholder="Add chapter name"
        /> */}
        <div className="grid grid-cols-2 gap-2 justify-between">
          <div className="relative">
            <input
              className="opacity-0 relative z-10"
              // onChange={handleVideoFile}
              type="file"
              accept="video/*"
              name="lectureVideo"
              placeholder=""
            />
            <div className="absolute rounded truncate top-0 border border-black w-full px-3">
              {chapter ? (
                chapter.title
              ) : (
                // <span className="flex items-center gap-2">
                //   <FaVideo />
                //   Add Lecture
                // </span>
                ''
              )}
            </div>
          </div>
          <div className="relative">
            {/* <input
              className="opacity-0 relative z-10"
              onChange={handleNotes}
              type="file"
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              name="lectureNote"
              placeholder=""
            /> */}
            <div className="absolute rounded top-0 border border-black w-full px-3">
              {chapter ? (
                chapter.pdf
              ) : (
                // <span className="flex items-center gap-2">
                //   <FaFile />
                //   Add Notes
                // </span>
                ''
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          {/* <button
            type="submit"
            // onClick={saveChapter}
            className="bg-black text-white text-center text-base px-4 py-2 font-bold  cursor-pointer"
          >
            Save Chapter
          </button> */}
        </div>
      </div>
    </>
  );
}

export default SavedLecture