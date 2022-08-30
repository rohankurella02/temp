import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";



const Forgotpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (user) => {
    // let token = localStorage.getItem("token");

    axios.put("/user-api/update-password" ,user)
    .then((response) => {
        alert(response.data.message);
        //if password updated
        if (response.data.message === "New Password Updated") {
          alert("Password updated");
        }
      })
    .catch((error) => {
        console.log(error);
        alert("Something went wrong in updating password");
      })
  };

  return (
    <div>
      <Container>
        <h3>Forgot password</h3>
        <p>Enter your username and Enter the new password</p>
        <div className="row">
          <div className="col-sm-8 col-md-6">
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
              <Form.Group className="mb-3">
                <Form.Label>Enter new Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  {...register("newpassword", { required: true })}
                />
                {/* validation error message for password */}
                {errors.newpassword && (
                  <p className="text-danger">*New Password is required</p>
                )}
              </Form.Group>

              <Button variant="info" type="submit">
                Update details
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Forgotpassword;
