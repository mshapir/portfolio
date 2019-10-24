import React from 'react';
import Buttons from './Buttons.js';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

class LandingPage extends React.Component {
  state = {
    user: this.props.user,
    portfolio: null
  }

  handleChange(event) {
  }

  componentDidMount() {
    this.fetchPortfolio();
  }

  fetchPortfolio() {
    // make API call to get portfolio for current user
    const apiResult = {};
    this.setState({
      portfolio: apiResult
    });
  }

  render() {
    return (
      <Buttons />
    );
  }
}

export default LandingPage;
