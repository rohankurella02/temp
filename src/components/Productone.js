import React from 'react';
function Productone(props) {

    return (
        <div className=''>
        <div className='card card-body m-3'>
            <img src={props.productObj.productImg}  />
            <h2>{props.productObj.productname}</h2>
            <h3>Price:₹{props.productObj.price}</h3>
            <h3>Exp.date:{props.productObj.expdate}</h3>
            
        </div>
        
        </div>
    )
}

export default Productone;