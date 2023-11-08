import React from 'react'
import {
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";


function courses() {
  return (
    <>
      <div className="relative rounded overflow-hidden shadow-lg group">
        <img
          className="w-full"
          src="Images/Home/course.png"
          alt="Course Image"
        />
        <div className="px-6 py-4">
          <span className="text-sm font-semibold text-gray-700">Category</span>
          <div className="font-bold mb-1">
            Microsoft Excel - Excel from Beginner to Advanced
          </div>
          <p className="text-gray-700 text-base">Tutor name</p>
          <div className="flex">
            <span>Rating</span>
            <span>⭐⭐⭐⭐⭐</span>
            <span>(598)</span>
          </div>
          <div className="pt-1 flex justify-between">
            <span>₹ 999</span>
            <span className="">+Add to cart</span>
          </div>
        </div>

        <HeartIcon
          className="absolute fill-red-600 text-red-700 right-2 top-3 h-10 w-10 opacity-0 transition-opacity  duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
    </>
  );
}

export default courses