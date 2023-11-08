import React, {Suspense} from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ShimmerList from '../components/ShimmerList/ShimmerList'
import TutorHome from '../pages/Tutor/TutorHome'
import AddCourse from '../pages/Tutor/AddCourse'
import AddModule from "../pages/Tutor/AddModule";

function TutorRouter() {
  const is_tutor = useSelector(state=>state.auth.userDetails ? state.auth.userDetails.is_tutor : null)
  return (
    <>
      {is_tutor ? (
        <Routes>
          <Route
            exact
            path="/courses"
            element={
              <Suspense fallback={<ShimmerList />}>
                <TutorHome />
              </Suspense>
            }
          />
          <Route
            exact
            path="/add-course"
            element={
              <Suspense fallback={<ShimmerList />}>
                <AddCourse />
              </Suspense>
            }
          />
          <Route
            exact
            path="/add-module"
            element={
              <Suspense fallback={<ShimmerList />}>
                <AddModule />
              </Suspense>
            }
          />
        </Routes>
      ) : (
        ""
      )}
    </>
  );
}

export default TutorRouter