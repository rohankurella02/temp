import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const Addproducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //state for image
  let [img, setImg] = useState(null);

  //on image select
  const onImageSelect = (event) => {
    setImg(event.target.files[0]);
  };

  const onFormSubmit = (productObj) => {
    //create FormData object
    let formData = new FormData();
    //append values to it
    formData.append("productObj", JSON.stringify(productObj));
    formData.append("photo", img);
    // let token=localStorage.getItem("token");
    // ,{headers:{Authorization:"Bearer "+token}}
    //http post req
    axios.post("/product-api/create-product",formData)
    .then((response) => {
        //if user created
        if (response.data.message === "Product created successfully") {
          alert("New product created");
        }
        if (response.data.message === "Unauthorized request") {
          alert("Login to access add products");
        }
      })
    .catch((error) => {
        console.log(error);
        alert("Something went wrong in creating product");
      })
  };
  return (
    <div>
      <Container>
        <div className="display-2 text-center text-info">Addproducts</div>
        <div className="row  ">
          <div className="col-12 col-sm-8 col-md-6  mx-auto d-block">
            <Form onSubmit={handleSubmit(onFormSubmit)}>
              {/* productname */}
              <Form.Group className="mb-3">
                <Form.Label>Productname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter productname"
                  {...register("productname", { required: true })}
                />
                {/* validation error message for productname */}
                {errors.productname && (
                  <p className="text-danger">* productname is required</p>
                )}
              </Form.Group>

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

              {/* price */}
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  {...register("price", { required: true })}
                />
                {/* validation error message for price */}
                {errors.price && (
                  <p className="text-danger">* price is required</p>
                )}
              </Form.Group>

              {/* exp date */}
              <Form.Group className="mb-3">
                <Form.Label>Exp date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter exp date"
                  {...register("expdate", { required: true })}
                />
                {/* validation error message for expdate */}
                {errors.expdate && (
                  <p className="text-danger">* expdate is required</p>
                )}
              </Form.Group>

              {/* product image */}
              <Form.Group className="mb-3">
                <Form.Label>Select image</Form.Label>
                <Form.Control
                  type="file"
                  {...register("photo", { required: true })}
                  onChange={(event) => onImageSelect(event)}
                />
                {/* validation error message for product */}
                {errors.photo && (
                  <p className="text-danger">* product image is required</p>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="m-3">
                Add
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Addproducts;
