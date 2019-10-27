import React from 'react';
import Home from './Home.js';
import FormContainer from './FormContainer.js';

class LandingPage extends React.Component {
  state = {
    user: null,
    loggedIn: false,
    displaySignIn: true
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    // check local storage to get user
    let token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    return fetch('https://stock-api-mshapir.herokuapp.com/users/current_user',{
      method: 'POST',
      headers: {
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
        this.setState({
          user: data,
          loggedIn: true
        });
    });
  }

  updateUser = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true
    });
  }

  changeFormDisplay = (isSignIn) => {
    this.setState({
      displaySignIn: isSignIn
    });
  }

  signOut = () => {
    localStorage.clear();
    this.setState({
      user: null,
      loggedIn: false,
      displaySignIn: true
    });
  }

  render() {
    return (
      this.state.loggedIn
        ?
        <Home user={this.state.user} signOut={this.signOut} />
        :
        <FormContainer isSignIn={this.state.displaySignIn} changeFormDisplay={this.changeFormDisplay} updateUser={this.updateUser} />
    );
  }
}

export default LandingPage;
