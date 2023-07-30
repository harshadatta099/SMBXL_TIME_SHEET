import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './NotFoundPage.css'
const NotFoundPage = () => {
  return (
    <Container className='not-found-container'>
      <Row className='justify-content-center align-items-center'>
        <Col xs={12} sm={8} md={6} className='not-found-content'>
          <h1>404</h1>
          <p>Oops! The page you are looking for does not exist.</p>
          <Button href='/' variant='primary'>
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage
