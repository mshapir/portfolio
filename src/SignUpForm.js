import React from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';

class SignUpForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    }, () => this.signUp());
  }

  signUp = () => {
    // call API here for user creation
    fetch('https://stock-api-mshapir.herokuapp.com/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.firstName + ' ' + this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      if (data.hasOwnProperty('errors')) {
        this.props.showToast("Error", data.errors);
        alert(`${data.errors}`);
      } else {
        localStorage.setItem("token", data.token);
        this.props.updateUser(data.user);
        const message = "User " + data.user.email + " was created successfully!";
        this.props.showToast("Success", message);
        alert(`User ${data.user.email} was created`);
      }
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
            <Form.Group as={Col} md="7" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="user@portfolio.com" ref="email" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref="password" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={{ span: 2, offset: 4 }}>
              <Button type="submit">Sign Up</Button>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Button variant="link" onClick={() => this.props.changeFormDisplay(true)}>Sign in to an existing account</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
