import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/NavBar";
import "./Style/HomePage.css";

function EmployeeList() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [message, setMeassage] = useState('')

  useEffect(() => {
    const URL = "http://localhost:5500/employee/";
    axios
      .get(URL)
      .then((response) => {
        setUserData(response.data.employeeList);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = userData.filter((item) => {
      const courseLower = Array.isArray(item.course)
        ? item.course.map((c) => String(c).toLowerCase()).join(", ")
        : String(item.course).toLowerCase();

      return (
        item.username.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.number.toString().includes(searchInput) ||
        item.designation.toLowerCase().includes(searchInput.toLowerCase()) ||
        courseLower.includes(searchInput.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [searchInput, userData]);

  const LoadEdit = (id) => {
    navigate(`/editemployee/${id}`);
  };

  const RmoveEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5500/employee/delete/${id}`)
        .then((response) => {
          setMeassage(response.data.message)
          console.log(message);
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error in delete the data:", error);
        });

      alert(`Employee with ID ${id} has been deleted`);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="home_Container">
        <div className="total_employee">
          <span className="employee_Count">Total Count:{userData.length}</span>
          <button
            className="add_Button"
            onClick={() => navigate("/addemployee")}
          >
            <i className="bi bi-plus-lg"></i> Add Employee
          </button>
        </div>
      </div>
      <div className="search_container">
        <label htmlFor="search">Search</label>
        <input
          type="search"
          name="search"
          id="search"
          onChange={(event) => setSearchInput(event.target.value)}
          value={searchInput}
        />
      </div>
      <div className="display_User">
        <h1>Employee List</h1>
        <table className="table">
          {console.log(userData)}
          <thead>
            <tr>
              <th scope="col">Unique Id#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Designation</th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
              <th scope="col">Create date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              const serialNumber = index + 1;
              return (
                <tr key={item._id}>
                  <th scope="row">{serialNumber}</th>
                  <td>
                    <img
                      width="50"
                      height="50"
                      src={`./Asset/${item.image}`}
                      alt="user"
                    />
                  </td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>{item.designation}</td>
                  <td>{item.gender}</td>
                  <td>{item.course}</td>
                  <td>{item.created_at}</td>
                  <td>
                    <a
                      onClick={() => {
                        LoadEdit(item._id);
                      }}
                      className="edit_Button btn btn-success"
                    >
                      Edit
                    </a>
                    <a
                      onClick={() => {
                        RmoveEmployee(item._id);
                      }}
                      className="delete_Button btn btn-danger"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
