import React from "react";
//import './Userdashboard.css'
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import {  GoChecklist} from "react-icons/go";

function Userdashboard() {
  let { userObj } = useSelector((state) => state.user);
  return (
    <>
      <img
        src={userObj.profileImg}
        className="float-end m-5 profile-pic"
        alt=""
      />
      <>
        <Nav className="justify-content-center mt-3" defaultActiveKey="/profile">
          <Nav.Item>
            <Nav.Link to="profile" as={NavLink}>
               <CgProfile/> User Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="cart" as={NavLink}>
               <FaShoppingCart/> Cart
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="products" as={NavLink}>
               <GoChecklist/> Products
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="mt-3">
          <Outlet />
        </div>
      </>
    </>
  );
}

export default Userdashboard;