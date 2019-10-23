import React from 'react';
import SignUpForm from './SignUpForm';
import { Card } from 'react-bootstrap';

class SignUp extends React.Component {
  render() {
    return (
      <div className="SignUp">
        <Card>
          <Card.Header as="h5">Sign Up</Card.Header>
          <Card.Body>
            <SignUpForm />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SignUp;
