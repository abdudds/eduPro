import React from 'react'
import { StarIcon, HeartIcon } from "@heroicons/react/24/outline";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';


function Course(course) {
  return (
    <>
      <div className="overflow-hidden border border-gray-500  shadow-lg group">
        <div className="flex gap-3 justify-end p-3">
          <span className="hover:text-emerald-500">
            <FaEdit />
          </span>
          <span className="hover:text-emerald-500">
            <FaTrash />
          </span>
        </div>
        <img className="w-full" src="/Tutor/course.png" alt="Course Image" />
        <div className="px-6 py-4">
          <span className="text-sm font-semibold text-gray-700">Category</span>
          <div className="font-bold mb-1">
            Microsoft Excel - Excel from Beginner to Advanced
          </div>
          {/* <p className="text-gray-700 text-base">Tutor name</p>
          <div className="flex">
            <span>Rating</span>
            <span>⭐⭐⭐⭐⭐</span>
            <span>(598)</span>
          </div>
          <div className="pt-1 flex justify-between">
            <span>₹ 999</span>
            <span className="">+Add to cart</span>
          </div> */}
          <p>
            Status: <span>Draft/Submitted/Running</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Course