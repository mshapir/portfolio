import React from 'react';
import Home from './Home.js';
import FormContainer from './FormContainer.js';

class LandingPage extends React.Component {
  state = {
    user: null,
    loggedIn: false,
    displaySignIn: true
  }

  handleChange(event) {
  }

  componentDidMount() {
    // this.fetchUser();
  }

  fetchUser() {
    // check local storage to get user
    const loggedIn = true;
    if (loggedIn) {
      this.setState({
        loggedIn: loggedIn
      });
    }
  }

  changeFormDisplay = (isSignIn) => {
    this.setState({
      displaySignIn: isSignIn
    });
  }

  render() {
    return (
      this.state.loggedIn
        ?
        <Home />
        :
        <FormContainer isSignIn={this.state.displaySignIn} changeFormDisplay={this.changeFormDisplay} />
    );
  }
}

export default LandingPage;
