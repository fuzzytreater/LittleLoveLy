import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import StaffDropdownMenu from "./StaffDropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
  return (
    <>
      <header className="manage-header">
        {/* logo + store name to return home page */}
        <div className="manage-store-name">
          <Link to={routes.staffHomePage} style={{ color: "white" }}>
            Little Lovely
          </Link>
        </div>

          {(window.location.pathname === routes.staffHomePage || window.location.pathname === routes.staffBrandList) &&(
            <div className="manage-search-bar">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <div className="manage-search-icon">
                  <Link className="manage-search">
                    <img src="../assets/images/search_icon.png" alt="search logo" />
                  </Link>
                </div>
            </div>
          )}          

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}>
            {localStorage.getItem("token") ? (
              <StaffDropdownMenu style={{ marginLeft: "10px" }} />
            ) : (
              <>
                <Dropdown className="staff-dropdown">
                  <Link to={routes.login}>
                    <Dropdown.Toggle id="staff-dropdown-basic">
                      <i class="fa-solid fa-user"></i>
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
