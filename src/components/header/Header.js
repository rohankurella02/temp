import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillHome } from "react-icons/ai";
import { BiLogIn, BiSearchAlt2 } from "react-icons/bi";
import { FaSignInAlt } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navlogo from "../../images/navlogo.png";
import { clearLoginStatus } from "../../slices/userSlice";
import Addproducts from "../Addproducts";
import Admindashboard from "../Admindashboard";
import Cart from "../Cart";
import Changepassword from "../Changepassword";
import Contactus from "../Contactus";
import Delproducts from "../Delproducts";
import Forgotpassword from "../Forgotpassword";
import Home from "../Home";
import Login from "../Login";
import Productone from "../Productone";
import Products from "../Products";
import Productsone from "../Productsone";
import Signup from "../Signup";
import Updateproducts from "../Updateproducts";
import Userdashboard from "../Userdashboard";
import Userprofile from "../Userprofile";
import "./Header.css";
function Header() {
  //get state from store
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  //get dispathc function
  let dispatch = useDispatch();

  //get navigate function
  let navigate = useNavigate();

  //logout user
  const userLogout = () => {
    localStorage.clear();
    dispatch(clearLoginStatus());
    navigate("/login");
  };
  // change password
  const changePassword = () => {
    navigate("/Changepassword");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [show, setShow] = useState(false);
  const [obj, setObj] = useState({});

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const onFormSubmit = (searchItem) => {
    console.log(searchItem);
    axios.get("/product-api/getproduct/"+searchItem.productname)
    .then((response) => {
        console.log(response.data.message);
        console.log(response.data.payload);
        //if product received
        if (response.data.message === "found") {
          console.log("product received");
          setObj(response.data.payload);
          handleShow();
        } else {
          alert("Product with given name does not exists");
        }
      })
    .catch((error) => {
        console.log(error);
        alert("Something went wrong in getting product");
      })
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.productname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Productone productObj={obj} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Navlogo} alt="not found" width={32} /> Medicare!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {isSuccess !== true ? (
                <>
                  {/* These links can be visible when no user logged in */}
                  <Nav.Item>
                    <Nav.Link eventKey="1" as={NavLink} to="/">
                      <AiFillHome /> Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="2" as={NavLink} to="/products">
                      <GoChecklist /> Products
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="3" as={NavLink} to="/signup">
                      <FaSignInAlt /> Signup
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="4" as={NavLink} to="/login">
                      <BiLogIn /> Login
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="5" as={NavLink} to="/contactus">
                      <MdEmail /> ContactUs
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  {/* This dropdown is visible only when a user is logged in */}
                  <NavDropdown
                    title={userObj.username}
                    className="collapsible-nav-dropdown"
                    id="drop-down"
                  >
                    <NavDropdown.Item onClick={changePassword}>
                      Change password
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={userLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
            <div className="ps-3">
              <Form className="d-flex " onSubmit={handleSubmit(onFormSubmit)}>
                <Form.Control
                  type="search"
                  placeholder="Enter product name to search"
                  {...register("productname", { required: true })}
                  className="me-2"
                  aria-label="Search"
                />
                {/* validation error message for search */}
                {errors.search && (
                  <p className="text-danger">* productname is required</p>
                )}
                <Button variant="outline-primary" type="submit">
                  <BiSearchAlt2 />
                  Search
                </Button>
              </Form>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/userdashboard" element={<Userdashboard />}>
          <Route path="profile" element={<Userprofile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          {/* Navigating to profile when child path is empty */}
          <Route path="" element={<Navigate to="profile" replace={true} />} />
        </Route>
        <Route path="/admindashboard" element={<Admindashboard />}>
          <Route path="profile" element={<Userprofile />} />
          <Route path="addproducts" element={<Addproducts />} />
          <Route path="delproducts" element={<Delproducts />} />
          <Route path="updateproducts" element={<Updateproducts />} />
          <Route path="productsone" element={<Productsone />} />
          {/* Navigating to profile when child path is empty */}
          <Route path="" element={<Navigate to="profile" replace={true} />} />
        </Route>
        <Route path="/Changepassword" element={<Changepassword />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </div>
  );
}

export default Header;
