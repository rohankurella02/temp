import axios from "axios";
import React, { useState, useEffect } from "react";
import Productone from "./Productone";


function Productsone() {
  let [productsList, setProductsList] = useState([]);

  useEffect(() => {
    axios.get("/product-api/getproducts")
    .then((response) => {
        console.log(response.data.payload);
        console.log(response.data.message);
        setProductsList(response.data.payload);
      })
    .catch((err) => {
        alert("error occured");
        console.log(err);
      })
  }, []);

  return (
    <div className="text-center">
      <p className="display-2 phead">Medicines</p>
      <hr />

      <div className="d-flex card-group abc">
        {productsList?.map((productObj, index) => (
          <Productone key={index} productObj={productObj} />
        ))}
      </div>
    </div>
  );
}

export default Productsone;
