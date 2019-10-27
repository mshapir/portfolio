import React from 'react';
import Buy from './Buy.js';
import { Table } from 'react-bootstrap';

class Transactions extends React.Component {
  state = {
    userId: this.props.userId,
    transactions: []
  }

  componentDidMount() {
    if (this.isValidUserId()) {
      this.fetchTransacations();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userId !== prevProps.userId) {
      this.setState({
        userId: this.props.userId
      });
    }
  }

  fetchTransacations() {
    // make API call to get portfolio for current user
    if (this.isValidUserId()) {
      let token = localStorage.getItem("token");
      fetch(`https://stock-api-mshapir.herokuapp.com/users/${this.state.userId}/portfolios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        }
      })
      .then(r => r.json())
      .then(data => {
        if (data) {
          this.setState({
            transactions: data.transactions
          });
        }
      });
    }
  }

  isValidUserId = () => {
    return this.state.userId !== null && this.state.userId !== undefined;
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '70%'}}>
          <h2>Transactions</h2>
          <Table responsive>
            <tbody>
              {
                this.state.transactions ?
                this.state.transactions.map(transaction => {
                  return (
                    <tr key={transaction.id} style={{borderBottom: '1px solid #ccc', lineHeight: '1.8em'}}>
                      <td> {transaction.transaction_type.toUpperCase()} ({transaction.ticker_name}) - {transaction.number_of_shares} SHARES @ ${transaction.ticker_price}</td>
                    </tr>)
                })
                :
                <tr></tr>
              }
            </tbody>
          </Table>
        </div>
        <div style={{width: '30%', marginLeft: 'auto'}}>
          <Buy userId={this.state.userId} portfolioId={this.props.portfolioId} refreshTransactions={this.fetchTransacations} />
        </div>
      </div>
    );
  }
}

export default Transactions;
