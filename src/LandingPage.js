import React from 'react';
import LandingPage from './LandingPage.js';
import FormContainer from './FormContainer.js';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

class Home extends React.Component {
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
        <LandingPage />
        :
        <FormContainer isSignIn={this.state.displaySignIn} changeFormDisplay={this.changeFormDisplay} />
    );
  }
}

export default Home;
