import contactImg from '../images/contact.svg'
import {Row,Col, Container} from 'react-bootstrap'
function Contactus() {
    return(
        <div className="container m-4">
            <p className="display-2 text-center text-primary">Contactus!</p>

            <img src={contactImg} width="500px" className="d-sm-block d-none mx-auto"
            alt="not found" />
            <br></br>
            <br></br>
            <p>For any queries , you can contact us at:</p>
            <Container>
            <Row>
                <Col>
                <p>Email us at: abc@gmail.com</p>
                </Col>
                <Col>
                <p>Cell : +91 1234567890</p>
                </Col>

            </Row>
            </Container>
            <div className='m-4'>
            <p> To reach us! , Our office address</p>
            <p >
                8-6-66 Paradise Complex,Fall season street,Fortune colony,Hyderabad- 500084
            </p>
            </div>
            <br></br><br></br>
            
        </div>
    );
}
export default Contactus