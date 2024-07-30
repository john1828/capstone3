import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

export default function PreviewProducts(props) {
  const { breakPoint, data } = props;

  const { _id, name, description, price } = data;

	return(
		<Col xs={12} md={breakPoint}>
	        <Card className="previewCard h-100 mx-2 mb-2">
	            <Card.Body className="d-grid align-content-center">
	                <Card.Title className="text-center">
	                    <Link style={{textDecoration: 'none'}} to={`/products/${_id}`}>{name}</Link>
	                </Card.Title>
	                <Card.Text>{description}</Card.Text>
	            </Card.Body>
	            <Card.Footer>
	                <h5 className="text-center">₱{price}</h5>
	                <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
	            </Card.Footer>
	        </Card>
		</Col>
	)
}

