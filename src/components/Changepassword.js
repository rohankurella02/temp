import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";



const Changepassword = () => {
  //get state from store
  let { userObj } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (user) => {
    user.username = userObj.username;
    // let token = localStorage.getItem("token");
    if (user.newpassword === user.confirmpassword) {
      axios.put("/user-api/update-password",user)
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
        });
    } else {
      alert("confirm password should be same as new password");
    }
  };

  return (
    <div>
      <Container>
        <h3>Change password</h3>
        <p>
          Enter your current password and Enter the new password two times to
          confirm
        </p>
        <div className="row">
          <div className="col-sm-8 col-md-6">
            <Form onSubmit={handleSubmit(onFormSubmit)}>
              {/* password */}
              <Form.Group className="mb-3">
                <Form.Label>Enter old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Old Password"
                  {...register("oldpassword", { required: true })}
                />
                {/* validation error message for password */}
                {errors.oldpassword && (
                  <p className="text-danger">*Old Password is required</p>
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
              {/* password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password again"
                  {...register("confirmpassword", { required: true })}
                />
                {/* validation error message for password */}
                {errors.confirmpassword && (
                  <p className="text-danger">
                    * Re entering new password is required
                  </p>
                )}
              </Form.Group>
              <Button variant="info" type="submit" className="m-5">
                Change password
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Changepassword;
