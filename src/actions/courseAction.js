import dispatcher from "../appDispatcher";
import * as courseAPI from "../api/courseApi";
import actionTypes from "./actionTypes";

//Below method is just like Action Creator in Flux as its creating action in LN 8-11.
export function saveCourse(course) {
  return courseAPI.saveCourse(course).then((savedCourse) => {
    //SO IT WILL BE LIKE - Hey dispatcher, go tell all the stores that a course was just created.
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function loadCourses() {
  return courseAPI.getCourses().then((_courses) => {
    //SO IT WILL BE LIKE - Hey dispatcher, go tell all the stores that a course was just created.
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: _courses,
    });
  });
}

export function deleteCourse(id) {
  return courseAPI.deleteCourse(id).then(() => {
    //SO IT WILL BE LIKE - Hey dispatcher, go tell all the stores that a course was just created.
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id,
    });
  });
}
