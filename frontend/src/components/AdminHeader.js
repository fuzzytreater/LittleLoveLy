import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import AdminDropdownMenu from "./AdminDropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";
export default function AdminHeader() {
  return (
    <>
      <header className="manage-header">
        {/* logo + store name to return home page */}
        <div className="manage-store-name">
          <Link to="#" style={{ color: "#ff469e" }}>
            <img src="../assets/images/logo02.png" alt="page logo" />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
          }}
        >
          {localStorage.getItem("token") ? (
            <AdminDropdownMenu style={{ marginLeft: "10px" }} />
          ) : (
            <>
              <Dropdown className="staff-dropdown">
                <Link to={routes.login}>
                  <Dropdown.Toggle id="staff-dropdown-basic">
                    <i className="fa-solid fa-user"></i>
                  </Dropdown.Toggle>
                </Link>
              </Dropdown>
            </>
          )}
        </div>
      </header>
    </>
  );
}