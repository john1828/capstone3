import { Container, Row, Col } from "react-bootstrap";
import FeaturedProducts from "../components/FeaturedProducts";
import "../index.css";

export default function Home() {
  return (
    <>
      <div className="featured py-4">
        <Container>
          <Row>
            <Col md={6}></Col>
            <Col xs={12} md={6}>
              <FeaturedProducts />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
