import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const validateField = (value, fieldName, setError) => {
    if (!value) {
      setError(`${fieldName} is required`);
      return false;
    }
    setError("");
    return true;
  };

  const validateForm = () => {
    const isEmailValid = validateField(email, "Email", setEmailError);
    const isPasswordValid = validateField(password, "Password", setPasswordError);
    return isEmailValid && isPasswordValid;
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(data));

    const { roleId, userId, tokenid } = data;
    localStorage.setItem("roleId", roleId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("tokenid", tokenid);

    const userRole = localStorage.getItem("roleId");
    const destination = roleNavigation[userRole];
    if (destination) {
      navigate(destination, { replace: true });
    }

    setResponseMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const apiUrl = "http://localhost:5070/Auth/login";
    const data = {
      email: email,
      password: password,
      userType: 0,
    };

    try {
      const response = await axios.post(apiUrl, data);

      if (response.status === 200 && response.data != null) {
        handleLoginSuccess(response.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setResponseMessage(error.response.data);
    }
  };

  const roleNavigation = {
    "1": "/user",
    "2": "/hr",
    "3": "/admin"
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}
    >
      <Card style={{ width: "400px", padding: "20px" }}>
        <Card.Title className="text-center mb-4">
          <h3>Login</h3>
        </Card.Title>
        {responseMessage && (
          <Alert
            variant={
              responseMessage === "Login successful" ? "success" : "danger"
            }
            className="text-center"
          >
            {responseMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="mt-2">
            <Form.Label>Password:</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
                placeholder="Enter your password"
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
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Login
          </Button>
          <div className="mt-2 text-center">
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Signup
          </Link>
        </div>
        <div className="mt-2 text-center">
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
