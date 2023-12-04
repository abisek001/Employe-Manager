import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import NavBar from "../Components/NavBar";
import "./Style/CreateEmployee.css";

function HomePage() {
  const navigate = useNavigate();
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
  const URL = "http://localhost:5500/employee/add";

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
      method: "POST",
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
      navigate("/home");
    };
  };

  return (
    <div>
      <NavBar />
      <div className="welcome">
        <b>Welcome to Admin Panel</b>
      </div>
      <div className="form_Container">
        <form className="add_Employee_Form" onSubmit={handleOnSubmit}>
          <h1>Create Employee</h1>
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
                />
                <label htmlFor="course">BSC</label>
              </div>
            </div>
          </div>
          <br />
          <div className="form_Group">
            <label htmlFor="file" className="field_Label filelable">
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
            ></input>
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

export default HomePage;
