import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import { useNavigate, useLocation } from 'react-router-dom'; 
const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleOTPChange = (event) => {
    setOtp(event.target.value);
    setError('');
    setSuccess('');
  };
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state? location.state.email: '';
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5070/Auth/verify?email=${email}&token=${otp}`, {
        email: email,
        token: otp,
      });

      if (response.status === 200) {
        setSuccess('Email verified successfully.');
        setError('');
        setTimeout(() => {
            navigate('/', { replace: true });
        }, 1000);

       
      } else {
        setError('Failed to verify OTP. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Row>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card style={{ width: '500px' }}>
            <Card.Body>
              <Card.Title className='text-center'>OTP Verification</Card.Title>
              <div className='text-center mt-2'>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="otpInput">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOTPChange}
                  />
                </Form.Group>
                <Button className='mt-3 w-100' variant="primary" type="submit">
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailVerification;
