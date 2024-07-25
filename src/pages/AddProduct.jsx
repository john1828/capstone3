import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";

export default function AddProduct({ handleClose, fetchData }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function createProduct(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    fetch(
      "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product already exists") {
          Swal.fire({
            title: "Error on Adding product",
            icon: "error",
            text: "Product already exist",
          });
        } else if (data) {
          setName("");
          setDescription("");
          setPrice(0);

          Swal.fire({
            title: "Success on Adding product",
            icon: "success",
            text: "Product Added Successfully.",
          });

          handleClose();
          fetchData();
          navigate("/products");
        } else {
          Swal.fire({
            title: "Error on Adding product",
            icon: "error",
            text: "Unsuccessful Product Creation",
          });
        }
      });
  }

  return user.isAdmin === true && user.id !== null ? (
    <>
      <Form onSubmit={(e) => createProduct(e)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Submit
        </Button>
      </Form>
    </>
  ) : (
    <Navigate to="/products" />
  );
}
