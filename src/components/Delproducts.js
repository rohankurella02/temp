import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";



const Delproducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFormSubmit = (productObj) => {
    console.log(productObj);
    // let token=localStorage.getItem("token");
    // ,{headers:{Authorization:"Bearer "+token}}
    //http post req
    axios.delete("/product-api/remove-product/" +productObj.id)
    .then((response) => {
        //if user created
        if (response.data.message === "product deleted") {
          alert("Product deleted ");
        } else {
          alert("Product with given id does not exists");
          console.log(response.data.payload);
        }
      })
    .catch((error) => {
        console.log(error);
        alert("Something went wrong in deleting product");
      })
  };
  return (
    <div>
      <Container>
        <h2 className="text-danger">
          Enter the id of the product to be deleted
        </h2>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Id */}
          <Form.Group className="mb-3">
            <Form.Label>productId</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Id"
              {...register("id", { required: true })}
            />
            {/* validation error message for Id */}
            {errors.id && <p className="text-danger">* Id is required</p>}
          </Form.Group>

          <Button variant="danger" type="submit" className="m-4">
            Delete
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Delproducts;
