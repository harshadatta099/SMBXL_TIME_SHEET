import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
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
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(response.data));

        // Extract roleId and userId from the response and store them separately
        const { roleId, userId, tokenid } = response.data;
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("userId", userId);
        localStorage.setItem("tokenid", tokenid);
        console.log("roleId:", roleId, "userId:", userId, "tokenid:", tokenid);
        const isUserLoggedIn = !!localStorage.getItem("isLoggedIn");
        if (isUserLoggedIn) {
          const userRole = localStorage.getItem("roleId");
          switch (userRole) {
            case "1":
              navigate("/user", { replace: true });
              break;
            case "2":
              navigate("/hr", { replace: true });
              break;
            case "3":
              navigate("/admin", { replace: true });
              break;
            default:
              break;
          }
        }
        setResponseMessage();
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.log("error.response:", error.response.data);
      setResponseMessage(error.response.data);
    }
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
          <a href="/signup" className="signup-link">Sign up</a>
        </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
