import React from 'react';
import Buttons from './Buttons.js';
import { Table } from 'react-bootstrap';

class Home extends React.Component {
  state = {
    user: this.props.user,
    portfolio: {},
    transactions: [],
    activeView: 'portfolio'
  }

  componentDidMount() {
    this.fetchPortfolio();
  }

  fetchPortfolio() {
    // make API call to get portfolio for current user
    const apiResult = {
      networth: 0,
      entries: {
        AAPL: {
          bought_price: 1,
          current_price: 2,
          total_shares: 3
        }
      }
    };
    this.setState({
      portfolio: apiResult
    });
  }

  fetchTransacations() {
    // make API call to get portfolio for current user
    const apiResult = [
      {
        id: 123,
        transaction_type: 'buy',
        ticker_name: 'AAPL',
        number_of_shares: 3,
        ticker_price: 1
      }
    ];
    this.setState({
      transactions: apiResult
    });
  }

  updateActiveView = (view) => {
    // avoid making an extra API call if user did not toggle to a different view than currently selected
    if (view !== this.state.activeView) {
      this.setState({
        activeView: view
      });

      switch (view) {
        case 'portfolio': return this.fetchPortfolio();
        case 'transactions': return this.fetchTransacations();
      }
    }
  }

  render() {
    return (
      <div>
        <Buttons updateActiveView={this.updateActiveView} />
        {this.state.activeView === 'portfolio' ?
          <h2>Portfolio (${this.state.portfolio.networth})</h2> : <h2>Transactions</h2>}
        <Table responsive>
          <tbody>
            {
              this.state.activeView === 'portfolio' && this.state.portfolio.entries
              ?
              Object.keys(this.state.portfolio.entries).map(key => {
                const entry = this.state.portfolio.entries[key];
                  return (
                    <tr key={key} style={{borderBottom: '1px solid #ccc', lineHeight: '1.8em'}}>
                      <td style={{color: entry.bought_price < entry.current_price ? 'green' : (entry.bought_price > entry.current_price ? 'red' : 'gray')}}> {key} - {entry.total_shares} SHARES @ ${entry.current_price}</td>
                    </tr>)
                })
              : this.state.activeView === 'transactions' && this.state.transactions ?
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
    );
  }
}

export default Home;
