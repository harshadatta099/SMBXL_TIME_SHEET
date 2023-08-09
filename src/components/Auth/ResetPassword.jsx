import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/smbxlLogo.svg";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
    setSuccess("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError("");
    setSuccess("");
  };
  const isPasswordValid = (password) => {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return password.length >= 6 && alphanumericRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordValid(password)) {
      setError("Password must be alphanumeric and at least 6 characters long.");
      setSuccess("");
      return;
    } else {
      if (password === "" || confirmPassword === "") {
        setError("Please enter password!");
        setSuccess("");
      } else if (password !== confirmPassword) {
        setError("Passwords do not match. Please try again.");
        setSuccess("");
      } else {
        try {
          const response = await axios.post(
            "http://192.168.1.148:5070/Auth/resetPassword",
            {
              email: email,
              password: password,
              confirmPassword: confirmPassword,
            }
          );

          if (response.status === 200) {
            localStorage.removeItem("email");
            setSuccess("Password reset successful.");
            setTimeout(() => {
              navigate("/");
            }, 3000);

            setError("");
          } else {
            setError("Failed to reset password. Please try again.");
            setSuccess("");
          }
        } catch (error) {
          setError("An error occurred. Please try again later.");
          setSuccess("");
        }
      }
    }
  };

  return (
    <>
       <div className="text-center bg-light ">
    <img src={logo} alt="image not found" />
    </div>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center bg-light"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card style={{ width: "400px", height: "auto" }}>
              <Card.Body>
                <Card.Title className="text-center">Reset Password</Card.Title>
                <div>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="passwordInput">
                    <Form.Label>New Password</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="confirmPasswordInput">
                    <Form.Label>Confirm New Password</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    </div>
                  </Form.Group>
                  <Button
                    className="w-100 mt-3"
                    variant="primary"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
