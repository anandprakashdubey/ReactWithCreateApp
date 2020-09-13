import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CoursesList from "./CoursesList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseAction";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h1>Courses</h1>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CoursesList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
