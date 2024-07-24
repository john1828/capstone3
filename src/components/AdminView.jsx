import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";

export default function AdminView() {
  return (
    <>
      <h1 className="text-center my-4"> Admin Dashboard</h1>
      <Container className="text-center">
        <Button variant="primary" className="m-3">
          Add new Product
        </Button>
        <Button variant="success" className="m-3">
          Show user orders
        </Button>
      </Container>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody></tbody>
      </Table>
    </>
  );
}
