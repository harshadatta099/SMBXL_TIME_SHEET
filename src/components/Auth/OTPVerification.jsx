import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import logo from '../../assets/smbxlLogo.svg';
import { BASE_URL } from '../../services/API';
const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleOTPChange = (event) => {
    setOtp(event.target.value);
    setError('');
    setSuccess('');
  };
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/Auth/verifyToken`, {
        email: email,
        token: otp,
      });

      if (response.status === 200) {
        setSuccess('OTP verified successfully.');
        setError('');
        setTimeout(() => {
         navigate('/reset-password');
        }, 3000);

       
      } else {
        setError('Failed to verify OTP. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return <>
  <div className="text-center mt-4">
    <img src={logo} alt="image not found" />
    </div>
    <Container fluid className="d-flex align-items-center justify-content-center " style={{ minHeight: '80vh' }}>
      <Row>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow" style={{ width: '500px' }}>
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
    </>
};

export default OTPVerification;
