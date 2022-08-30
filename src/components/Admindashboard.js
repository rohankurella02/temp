import React from 'react'
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import {  GoChecklist} from "react-icons/go";
import {RiFolderReduceFill  } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const Admindashboard = () => {
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
              <CgProfile/> Admin Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="addproducts" as={NavLink}>
              <FaShoppingCart/> AddProducts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="delproducts" as={NavLink}>
               <RiFolderReduceFill/> delete products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="updateproducts" as={NavLink}>
               <GrUpdate/> update products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="productsone" as={NavLink}>
              <GoChecklist/> Get Products
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

export default Admindashboard