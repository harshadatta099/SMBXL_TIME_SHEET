import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password === '' || confirmPassword === '') {
      setError('Please enter password!');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setSuccess('');
    } else {
      // Perform password reset logic here
      console.log('Password reset for:', password);
      setError('');
      setSuccess('Password reset successful.');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <Row>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card style={{width:'400px',height:"auto"}}>
            <Card.Body>
              <Card.Title className='text-center'>Reset Password</Card.Title>
              <div >
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="passwordInput">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group controlId="confirmPasswordInput">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Form.Group>
                <Button className='w-100 mt-3' variant="primary" type="submit">
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
