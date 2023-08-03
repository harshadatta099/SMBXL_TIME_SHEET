import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Clear the alert when email changes
    setAlert({ message: '', variant: '' });
  };
  localStorage.setItem('email', email);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:5070/Auth/forgotPassword?email=${email}`);
      console.log(response.data);
      
      if (response.status === 200) {
        setAlert({ message: response.data, variant: 'success' });
        setTimeout(() => {
          navigate('/verify-otp');
        }, 2000);

        
      } else {
        
        setAlert({ message: response.data, variant: 'danger' });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setAlert({ message: error.response.data, variant: 'danger' });
      } else if (error.request) {
        // The request was made but no response was received, error.request is an instance of XMLHttpRequest
        setAlert({ message: 'No response from the server. Please try again later.', variant: 'danger' });
      } else {
        // Something happened in setting up the request that triggered an Error
        setAlert({ message: 'An error occurred. Please try again later.', variant: 'danger' });
      }
    }
  };
  

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col className="d-flex justify-content-center align-items-center">
          <Card style={{width:"400px"}}>
            <Card.Body>
              <Card.Title className='text-center'>Forgot Password</Card.Title>
              <div className='mt-3 text-center'>

                {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="emailInput">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                <Button className='mt-3 w-100' variant="primary" type="submit" onClick={handleSubmit}>
                  Send Reset Link
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
