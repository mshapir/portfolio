import React from 'react';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';

class SignInForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value
    }, () => this.signIn());
  }

  signIn = () => {
    // call API here for authentication
    fetch('https://stock-api-mshapir.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.hasOwnProperty('error')) {
        this.props.showToast("Error", data.error);
        alert(data.error);
      } else {
        this.props.updateUser(data.user);
        localStorage.setItem("token", data.token);
      }
    });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                ref="username"
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
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
