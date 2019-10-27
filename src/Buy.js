import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class Buy extends React.Component {
  state = {
    userId: this.props.userId,
    portfolioId: this.props.portfolioId,
    tickerName: '',
    amount: '',
    completedTransaction: {}
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userId !== prevProps.userId) {
      this.setState({
        userId: this.props.userId
      });
    }

    if (this.props.portfolioId !== prevProps.portfolioId) {
      this.setState({
        portfolioId: this.props.portfolioId
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      tickerName: this.refs.tickerName.value,
      amount: this.refs.numberOfShares.value
    }, () => this.makeTransaction());
  }

  makeTransaction = () => {
    if (this.state.userId !== null && this.state.portfolioId !== null) {
      let token = localStorage.getItem("token");
      fetch('https://stock-api-mshapir.herokuapp.com/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({
          user_id: this.state.userId,
          ticker_name: this.state.tickerName,
          number_of_shares: this.state.amount,
          transaction_type: 'BUY',
          portfolio_id: this.state.portfolioId
        })
      })
      .then(r => r.json())
      .then(data => {
        this.setState({
          completedTransaction: data
        });
        this.props.refreshTransactions();
      });
    }
  }

  render() {
    return (
      <div className="BuyForm col-md-11">
        <Card>
          <Card.Header as="h5">Buy Stocks!</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Ticker Name</Form.Label>
                <Form.Control type="text" ref="tickerName" placeholder="AAPL" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Shares</Form.Label>
                <Form.Control type="number" ref="numberOfShares" placeholder="3" required />
              </Form.Group>
              <Form.Group>
                <Button type="submit">Buy</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Buy;
