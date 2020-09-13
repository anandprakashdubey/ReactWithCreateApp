import EventEmitter from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((item) => item.slug === slug);
  }
}

const store = new CourseStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.DELETE_COURSE:
      _courses = _courses.filter((item) => item.id !== parseInt(action.id, 10));
      store.emitChange();
      break;
    case actionType.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionType.UPDATE_COURSE:
      _courses = _courses.map((item) =>
        item.id === action.course.id ? action.course : item
      );
      store.emitChange();
      break;
    case actionType.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    default:
    //nothing to do here
  }
});
export default store;
