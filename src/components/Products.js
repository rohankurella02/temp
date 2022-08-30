import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product"; 



function Products() {
  let [productsList, setProductsList] = useState([]);
  console.log(process.env.REACT_APP_URL + "/product-api/getproducts")

  useEffect(() => {
    axios.get("/product-api/getproducts")
    .then((response) => {
        console.log(response.data.payload);
        //console.log(response.data.message);
        setProductsList(response.data.payload);
      })
    .catch((err) => {
        alert("error occured");
        console.log(err);
      console.log(process.env.REACT_APP_URL + "/product-api/getproducts")
      })
  }, []);

  return (
    <div className="text-center">
      <p className="display-2 phead">Medicines</p>
      <hr />

      <div className="d-flex card-group abc">
        {productsList && productsList?.map((productObj, index) => (
          <Product key={index} productObj={productObj} />
        ))}
      </div>
    </div>
  );
}

export default Products;
