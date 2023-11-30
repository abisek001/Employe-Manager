import React from "react";

import "../Pages/Style/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const NavLink = [
    { name: "Home", link: "/home" },
    { name: "Employee List", link: "/employeeList" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/'
  }

  return (
    <div className="Nav_Container">
      <div className="left_Side">
        <div className="nav_Logo">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/clouds/100/a.png"
            alt="a-logo"
          />
        </div>
        <ul className="nav_Links">
          {NavLink.map(({ name, link }) => {
            return (
              <li key={name} className="nav-Link">
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="right_Side">
        <span className="nav_usernamr">Abisek</span>
        <button className="logout_Button" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;
