import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";

function FnCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((_courses) => setCourses(_courses));
  }, []);

  return (
    <>
      <h1>Courses</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author Id</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.authorId}</td>
                <td>{item.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default FnCoursesPage;
