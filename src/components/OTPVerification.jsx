import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleOTPChange = (event) => {
    setOtp(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Example OTP validation
    if (otp === '1234') {
      console.log('OTP verification successful');
      setError('');
      setSuccess('OTP verification successful!');
    } else {
      setError('Invalid OTP. Please try again.!!');
      setSuccess('');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Row>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card style={{ width: '500px', }}>
            <Card.Body>
              <Card.Title className='text-center'>OTP Verification</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
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

export default OTPVerification;
