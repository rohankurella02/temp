import React from 'react';
import { useSelector } from "react-redux";
import { useCart } from 'react-use-cart';
function Product(props) {
     //get user state from redux
  let { userObj, isSuccess } = useSelector(
    (state) => state.user
  );

    const {addItem}=useCart();
    const some=()=>{
        if(isSuccess===true){
            addItem(props.productObj)
        }
        else{
            alert("Login to add into cart")
        }
    }

    return (
        <div className=''>
        <div className='card card-body m-3'>
            <img src={props.productObj.productImg}  />
            <h2>{props.productObj.productname}</h2>
            <h3>Price:₹{props.productObj.price}</h3>
            <h3>Exp.date:{props.productObj.expdate}</h3>
            <button onClick={some} className='bt'>Add to Cart</button>

        </div>
        
        </div>
    )
}

export default Product;