import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

// import { Prompt } from "react-router-dom";
const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: "",
    category: "",
  });

  useEffect(() => {
    let slugValue = props.match.params.slug; // This we can because we declare routing like manageCourse/:slug
    if (slugValue) {
      courseApi.getCourseBySlug(slugValue).then((item) => {
        setCourse(item);
      });
    }
  }, [props.match.params.slug]);

  function handleChange(event) {
    //const updatedCourseObject = { ...course, title: event.target.value };
    //Line14 setting up title property but what if loads of property are there, then we need to update it at runtime
    //Below line is setting up value and property dynamically so no need to write different change control
    const updatedCourseObject = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourseObject);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author Id is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }
  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt when={true} message="Are you sure you want to leave" /> */}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
