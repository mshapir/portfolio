import React from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';

class SignInForm extends React.Component {
  state = {
    username: '',
    password: '',
    validated: false
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.setState({
        validated: true,
        username: this.refs.username.value,
        password: this.refs.password.value
      }, () => this.signIn());
    }
  }

  signIn() {
    // call API here for authentication
  }

  render() {
    return (
      <div>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                ref="username"
                type="text"
                placeholder="Username"
                pattern="^[_A-z0-9]{1,}$"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref="password"
              type="password"
              placeholder="Password"
              pattern="^[_A-z0-9]{1,}$"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md={{ span: 2, offset: 5 }}>
              <Button type="submit">Sign In</Button>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Button variant="link" onClick={() => this.props.changeFormDisplay(false)}>Create an account</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default SignInForm;
