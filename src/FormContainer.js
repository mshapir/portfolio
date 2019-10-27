import React from 'react';
import SignUpForm from './SignUpForm.js';
import SignInForm from './SignInForm.js';
import ResultToast from './ResultToast.js';
import { Card } from 'react-bootstrap';

class FormContainer extends React.Component {
  state = {
    toast: {
      show: false,
      header: '',
      message: ''
    }
  }

  showToast = (header, message) => {
    this.setState({
      toast: {
        show: true,
        header: header,
        message: message
      }
    });
  }

  render() {
    const signInTitle = 'Sign In', signUpTitle = 'Sign Up';

    return (
      <div className="AuthForm">
        <div className="ResultToast col-12">
          <ResultToast data={this.state.toast} />
        </div>
        <Card>
          <Card.Header as="h5">{this.props.isSignIn ? signInTitle : signUpTitle}</Card.Header>
          <Card.Body>
            {this.props.isSignIn ? <SignInForm changeFormDisplay={this.props.changeFormDisplay} updateUser={this.props.updateUser} showToast={this.showToast} /> : <SignUpForm changeFormDisplay={this.props.changeFormDisplay} updateUser={this.props.updateUser} showToast={this.showToast} />}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default FormContainer;
