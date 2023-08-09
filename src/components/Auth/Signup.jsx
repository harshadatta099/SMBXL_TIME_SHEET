import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Logo from '../Logo';
import { BASE_URL } from '../../services/API';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileno: '',
  });

  const [errors, setErrors] = useState({
    responseMsg: '',
    username: '',
    email: '',
    password: '',
    mobileno: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const newErrors = {
      username: formData.username ? '' : 'Username is required.',
      email: formData.email ? '' : 'Email is required.',
      password: formData.password ? '' : 'Password is required.',
      mobileno: formData.mobileno ? '' : 'Mobile No is required.',
    };

    // Password validation
    const isPasswordValid = (password) => {
      const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
      return password.length >= 6 && alphanumericRegex.test(password);
    };
    
    if (formData.password) {
      if (!isPasswordValid(formData.password)) {
        newErrors.password =
          'Password must be alphanumeric and contain at least 6 characters.';
      }
    }
    const isPhoneNumberValid = (phoneNumber) => {
      const phoneRegex =/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}$/;
      return phoneRegex.test(phoneNumber);
    };
    
    if (formData.mobileno) {    
      if (!isPhoneNumberValid(formData.mobileno)) {
        newErrors.mobileno =  'Please enter a valid phone number.';
      }
    }
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === '')) {
      // No errors, submit the form
      const apiURL = `${BASE_URL}/Auth/signup`;

      axios
        .post(apiURL, formData)
        .then((response) => {
          // Handle successful signup response
          console.log('Signup successful:', response.data);
          if (response.data != null) {
            // alert('Signup successful');
            setErrors((prevErrors) => ({ ...prevErrors, responseMsg: "Signup successful" }));
            setTimeout(() => {
              navigate('/verify-email',{state:{email:formData.email}} );
            }, 2000);
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error signing up:', error);
          setErrors((prevErrors) => ({ ...prevErrors, responseMsg: error.response.data }));
        });
    }
  };

  return <>
    <div className='mt-4'>
      <Logo/>
    </div>
    <div
      className='container-fluid d-flex justify-content-center align-items-center '
      style={{ minHeight: '80vh' }}
      
    >
   
      <Card className='shadow' style={{ width: '400px', padding: '20px' }}>
        <h2 className='text-center mb-4'>Signup</h2>
        {
        errors.responseMsg && (
          <Alert variant={errors.responseMsg==="Signup successful"?"success":"danger"} className='text-center'>
            {errors.responseMsg}
          </Alert>)
     }
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              placeholder='Enter your username'
            />
            {errors.username && (
              <Alert variant='danger'>{errors.username}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='Enter your email'
            />
            {errors.email && <Alert variant='danger'>{errors.email}</Alert>}
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <div style={{ position: 'relative' }}>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='Enter your password'
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <Alert variant='danger'>{errors.password}</Alert>
            )}
          </Form.Group>

          <Form.Group controlId='mobileno'>
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type='number'
              name='mobileno'
              value={formData.mobileno}
              onChange={handleChange}
              required
              placeholder='Enter your mobile number'
            />
            {errors.mobileno && (
              <Alert variant='danger'>{errors.mobileno}</Alert>
            )}
          </Form.Group>

          <Button className='mt-3 w-100' variant='primary' type='submit'>
            Signup
          </Button>
          <div className='mt-2 text-center'>
            Already have an account?{' '}
            <Link to='/' style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
    </>
};

export default Signup;
