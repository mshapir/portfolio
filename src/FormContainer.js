import React from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { Card } from 'react-bootstrap';

class FormContainer extends React.Component {
  render() {
    const signInTitle = 'Sign In', signUpTitle = 'Sign Up';

    return (
      <div className="AuthForm">
        <Card>
          <Card.Header as="h5">{this.props.isSignIn ? signInTitle : signUpTitle}</Card.Header>
          <Card.Body>
            {this.props.isSignIn ? <SignInForm changeFormDisplay={this.props.changeFormDisplay} /> : <SignUpForm changeFormDisplay={this.props.changeFormDisplay} />}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FormContainer;
