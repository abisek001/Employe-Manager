import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "../Components/NavBar";
import "./Style/CreateEmployee.css";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    number: "",
    designation: "",
    gender: "",
    course: [],
    image: "",
  });
  const [message, setMessage] = useState("");
  console.log(id);

  useEffect(() => {
    const URL = `http://localhost:5500/employee/by/${id}`;
    axios
      .get(URL)
      .then((response) => {
        setEmployeeData(response.data.employee);
        setformData({
          username: response.data.employee.username,
          email: response.data.employee.email,
          number: response.data.employee.number,
          designation: response.data.employee.designation,
          gender: response.data.employee.gender,
          course: response.data.employee.course,
          image: response.data.employee.image,
        });
      })
      .catch((error) => console.log("Error fetching employee data:", error));
  }, [id]);

  const hadleOnChange = (event) => {
    console.log(event);
    if (event.target.name === "course") {
      let copy = { ...formData };
      if (event.target.checked) {
        copy.course.push(event.target.value);
      } else {
        copy.course = copy.course.filter((item) => item !== event.target.value);
      }
      setformData(copy);
    } else if (event.target.name === "file") {
      const file = event.target.files[0];
      let copy = { ...formData };
      if (file) {
        copy.image = file.name;
      }
      setformData(copy);
    } else {
      setformData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleOnSubmit = (event) => {
    const URL = `http://localhost:5500/employee/edit/${id}`;
    event.preventDefault();
    console.log(formData);
    const employeeData = {
      username: formData.username,
      email: formData.email,
      number: formData.number,
      designation: formData.designation,
      course: formData.course,
      gender: formData.gender,
      image: formData.image,
    };
    fetch(URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setMessage(data.message);
          navigateToHomePage();
        } else {
          setMessage("Failed to save the data");
        }
      });
    const navigateToHomePage = () => {
      navigate("/employeelist");
    };
  };

  return (
    <div>
      <NavBar />
      <div className="form_Container">
        <form className="add_Employee_Form" onSubmit={handleOnSubmit}>
          <h1>Edit Employee</h1>
          <div className="form_Group">
            <label htmlFor="name" className="field_Label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              className="add_Name"
              required
              onChange={hadleOnChange}
              value={formData.username}
            />
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="email" className="field_Label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="add_Name"
              required
              onChange={hadleOnChange}
              value={formData.email}
            />
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="phone" className="field_Label">
              Mobile No
            </label>
            <input
              type="tel"
              id="phone"
              name="number"
              pattern="[0-9]{10}"
              required
              className="add_Name"
              onChange={hadleOnChange}
              value={formData.number}
            ></input>
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="designation" className="field_Label">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="form_Select"
              onChange={hadleOnChange}
              value={formData.designation}
              required
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="gender" className="field_Label" required>
              Gender
            </label>
            <div className="form_Subgroup">
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="male"
                  onChange={hadleOnChange}
                  checked={formData.gender === "male"}
                />
                <label htmlFor="gender"> Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="female"
                  onChange={hadleOnChange}
                  checked={formData.gender === "female"}
                />
                <label htmlFor="gender"> Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  value="other"
                  onChange={hadleOnChange}
                  checked={formData.gender === "other"}
                />
                <label htmlFor="gender"> Other</label>
              </div>
            </div>
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="course" className="field_Label" required>
              Course
            </label>
            <div className="form_Subgroup">
              <div>
                <input
                  type="checkbox"
                  name="course"
                  id="course"
                  value="MCA"
                  onChange={hadleOnChange}
                  checked={formData.course.includes("MCA")}
                />
                <label htmlFor="course">MCA</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="course"
                  id="course"
                  value="BCA"
                  onChange={hadleOnChange}
                  checked={formData.course.includes("BCA")}
                />
                <label htmlFor="course">BCA</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="course"
                  id="course"
                  value="BSC"
                  onChange={hadleOnChange}
                  checked={formData.course.includes("BSC")}
                />
                <label htmlFor="course">BSC</label>
              </div>
            </div>
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="file" className="field_Label">
              Upload Image
            </label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              name="file"
              id="file"
              className="add_Name"
              onChange={hadleOnChange}
              required
            />
          </div>
          <br />
          <div className="form_Button">
            <input type="submit" className="submit_Button" />
            <p>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
