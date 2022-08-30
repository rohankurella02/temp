import homeImg from "../images/home.svg";
import {Carousel} from "react-bootstrap"
import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";
import carousel5 from "../images/carousel5.jpg";

function Home() {
  return (
    <div className="container">
      <div className="m-4">
      <img
        src={homeImg}
        width="300px"
        className="d-sm-block d-none mx-auto"
        alt="not found"
      />
      </div>
        <div className="m-5">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Avail the offers soon....</h3>
            <p>Only at our medi store</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Offer closes soon</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Rush!!!!</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel5}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Hurry up not late!</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
      <br/><br/>
    </div>
  );
}
export default Home;
