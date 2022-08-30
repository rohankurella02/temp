import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImg from "../images/login.svg";
import { userLogin } from "../slices/userSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get user state from redux
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );

  //get dispatch function to call action creator functions
  let dispatch = useDispatch();

  //get navigate functon to navigate programatically
  let navigate = useNavigate();
  
  //when login form is submitted
  const onFormSubmit = (userCredentialsObject) => {
    console.log(userCredentialsObject);
    dispatch(userLogin(userCredentialsObject));
  };

  //this to be executed when either isSuccess or isError changed
  useEffect(() => {
    if (isSuccess) {
      if (userObj.userType == "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    }
  }, [isSuccess, isError]);

  return (
    <div className="container">
      <p className="display-2 text-center text-primary">Login</p>

      <img
        src={loginImg}
        width="300px"
        className="d-sm-block d-none mx-auto h-50"
        alt=""
      />
      <div className="row  ">
        <div className="col-12 col-sm-8 col-md-6  mx-auto d-block">
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            
            {/* username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                {...register("username", { required: true })}
              />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Username is required</p>
              )}
            </Form.Group>

            {/* password */}
            <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {/* validation error message for password */}
              {errors.password && (
                <p className="text-danger">* Password is required</p>
              )}
            </Form.Group>
            <div className="row mb-4">
              <div className="col-5">
                <Button variant="secondary" type="submit">
                  Login
                </Button>
              </div>
              <div className="col-5">
                <Button variant="danger" href="/forgotpassword">
                  Forgot Password
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
