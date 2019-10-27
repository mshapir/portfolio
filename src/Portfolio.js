import React from 'react';
import { Table } from 'react-bootstrap';

class Portfolio extends React.Component {
  state = {
    userId: this.props.userId,
    portfolio: {
      total_networth: 0.0,
      entries: {}
    }
  }

  componentDidMount() {
    if (this.isValidUserId()) {
      this.fetchPortfolio();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userId !== prevProps.userId) {
      this.setState({
        userId: this.props.userId
      });
    }
  }

  fetchPortfolio() {
    // make API call to get portfolio for current user
    let token = localStorage.getItem("token");
    fetch(`https://stock-api-mshapir.herokuapp.com/users/${this.state.userId}/portfolios/get_portolios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    .then(r => r.json())
    .then(data => {
      if (!data) {
        this.createPortfolio();
      } else {
        if (data.hasOwnProperty('errors')) {
          // this.showToast("Error", data.errors);
          alert(data.errors);
        } else {
          this.setState({
            portfolio: data
          });
          this.props.updatePortfolioId(data.portfolioObject.id);
        }
      }
    })
    .catch(e => {
      console.log(e);
      this.createPortfolio();
    });
  }

  createPortfolio() {
    // make API call to create portfolio for current user
    if (this.isValidUserId()) {
      let token = localStorage.getItem("token");
      fetch('https://stock-api-mshapir.herokuapp.com/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({
          user_id: this.state.userId
        })
      })
      .then(r => r.json())
      .then(data => {
        if (data.hasOwnProperty('errors')) {
          alert(data.errors);
        } else {
          this.setState({
            portfolio: data
          });
          this.props.updatePortfolioId(data.id);
        }
      });
    }
  }

  isValidUserId = () => {
    return this.state.userId !== null && this.state.userId !== undefined;
  }

  render() {
    return (
      <div>
        <h2>Portfolio (${this.state.portfolio.total_networth})</h2>
        <Table responsive>
          <tbody>
            {
              this.state.portfolio && this.state.portfolio.entries
              ?
              Object.keys(this.state.portfolio.entries).map(key => {
                const entry = this.state.portfolio.entries[key];
                  return (
                    <tr key={key} style={{borderBottom: '1px solid #ccc', lineHeight: '1.8em'}}>
                      <td style={{color: entry.bought_price < entry.current_price ? 'green' : (entry.bought_price > entry.current_price ? 'red' : 'gray')}}> {key} - {entry.total_shares} SHARES @ ${entry.current_price}</td>
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

export default Portfolio;
