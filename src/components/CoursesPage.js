import React from "react";
import { getCourses } from "../api/courseApi";
import CoursesList from "./CoursesList";
import { Link } from "react-router-dom";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }
  componentDidMount() {
    getCourses().then((data) => {
      this.setState({ courses: data });
    });
  }

  render() {
    return (
      <>
        <h1>Courses</h1>
        <Link className="btn btn-primary" to="/course">
          Add Course
        </Link>
        <CoursesList courses={this.state.courses} />
      </>
    );
  }
}

export default CoursesPage;
