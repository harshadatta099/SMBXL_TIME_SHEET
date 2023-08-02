import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ message: '', variant: '' });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Clear the alert when email changes
    setAlert({ message: '', variant: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('your-api-url', { email }); // Replace 'your-api-url' with your actual API endpoint
      if (response.status === 200) {
        setAlert({ message: response.data.message, variant: 'success' });
      } else {
        setAlert({ message: response.data.error, variant: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'An error occurred. Please try again later.', variant: 'danger' });
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col className="d-flex justify-content-center align-items-center">
          <Card style={{width:"400px"}}>
            <Card.Body>
              <Card.Title className='text-center'>Forgot Password</Card.Title>
              <div className='mt-3'>

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
