import React from "react";
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Userprofile() {

  //get userObj from redux
  let {userObj}=useSelector(state=>state.user);

  return (
    <div>
    <Card style={{ width: "18rem" }} className='mx-auto mt-5'>
      <Card.Img variant="top" src={userObj.profileImg} />
      <Card.Body>
        <Card.Title>{userObj.username}</Card.Title>
        <Card.Text>
         {userObj.email}
        </Card.Text>
        <Card.Text>
         {userObj.city}
        </Card.Text>
      </Card.Body>
    </Card>
    <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default Userprofile;