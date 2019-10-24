import React from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';

class SignUpForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    validated: false
  };

  handleSubmit(event) {
    console.log(event);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.setState({
        validated: true,
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        username: this.refs.username.value,
        password: this.refs.password.value
      }, () => this.signUp());
    }
  }

  function signUp() {
    // call API here for user creation 
  }

  render() {
    return (
      <div>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                pattern="^[_A-z]"
                ref="firstName"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                pattern="^[_A-z]"
                ref="lastName"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  pattern="^[_A-z0-9]{1,}$"
                  ref="username"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="9" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="user@portfolio.com" ref="email" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref="password" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
