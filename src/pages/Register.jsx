import { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import loginImg from "../assets/login.png";
import Swal from "sweetalert2";
import "../index.css";

export default function Register() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // State hooks to store the values of the input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to determine whether submit button is enable or not
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    // Prevents the page redirection via form submission
    e.preventDefault();

    fetch("https://capstone2-eozr.onrender.com/b4/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Registered Successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Registered Successfully",
          });
          navigate("/login");
        } else if (data.error === "Email invalid") {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please use valid email address",
          });
        } else if (data.error === "Mobile number invalid") {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Mobile number is invalid",
          });
        } else if (data.error === "Password must be at least 8 characters") {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Password must be at least 8 characters",
          });
        } else if (data.error === "User already exists") {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "User already exist!",
          });
        }
      });
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={{ order: "second", span: 6 }} className="registerImg">
            <img src={loginImg} alt="eCommerce" className="img-fluid" />
          </Col>
          <Col
            md={{ order: "first", span: 6 }}
            xs={12}
            className="registerForm">
            <Form onSubmit={(e) => registerUser(e)} className="my-5">
              <h1 className="text-center">Register</h1>
              <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter 11 Digit No."
                  required
                  value={mobileNo}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Verify Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Verify your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Group>
              {isActive ? (
                <Button variant="primary" type="submit" id="submitBtn">
                  Submit
                </Button>
              ) : (
                <Button variant="danger" type="submit" id="submitBtn" disabled>
                  Submit
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
