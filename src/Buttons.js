import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

class Buttons extends React.Component {
  state = {
    checked: 'portfolio'
  }

  handleChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      checked: event.target.value
    });
  }

  render() {
    return (
      <div className="ButtonGroup">
        <ButtonGroup toggle className="mt-3" onChange={this.handleChange.bind(this)}>
          <ToggleButton type="radio" name="radio" defaultChecked value="portfolio" checked={this.state.checked === 'portfolio'}>
            Portfolio
          </ToggleButton>
          <ToggleButton type="radio" name="radio" value="transactions" checked={this.state.checked === 'transactions'}>
            Transacations
          </ToggleButton>
        </ButtonGroup>
      </div>
    );
  }
}

export default Buttons;
