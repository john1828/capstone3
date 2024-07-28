import { Container, Row, Col } from "react-bootstrap";
import AdminView from "../components/AdminView";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <div className="featured py-4">
        <Container>
          <Row>
            <Col md={6}>
            </Col> 
            <Col xs={12} md={6}>
              <FeaturedProducts />
            </Col> 
          </Row>
        </Container>
      </div>
    </>
    
  );
}
