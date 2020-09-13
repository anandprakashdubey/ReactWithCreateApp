import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CoursesList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author Id</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <Link to={"/course/" + item.slug}>{item.title}</Link>
              </td>
              <td>{item.authorId}</td>
              <td>{item.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteCourseItem(item.id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  function deleteCourseItem(id) {
    props.deleteCourse(id).then(() => {
      toast.success("Course deleted.");
    });
  }
}

//Below is the validation prop
CoursesList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  //Below is valiadtion on each object or array , should have mentioned property and type
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

//Defualt value of props if not passed
// CoursesList.defaultProps = {
//   courses: [],
// };

export default CoursesList;
