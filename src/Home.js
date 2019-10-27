import React from 'react';
import Buttons from './Buttons.js';
import Portfolio from './Portfolio.js';
import Transactions from './Transactions.js';

class Home extends React.Component {
  state = {
    user: this.props.user,
    portfolioId: '',
    activeView: 'portfolio'
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.user !== prevProps.user) {
      this.setState({
        user: this.props.user
      });
    }
  }

  updateActiveView = (view) => {
    // avoid making an extra API call if user did not toggle to a different view than currently selected
    if (view !== this.state.activeView) {
      this.setState({
        activeView: view
      });

      switch (view) {
        case 'portfolio': return;
        case 'transactions': return;
        case 'signOut': return this.props.signOut();
      }
    }
  }

  updatePortfolioId = (id) => {
    this.setState({
      portfolioId: id
    });
  }

  render() {
    const userId = this.state.user.id ? this.state.user.id : null;
    return (
      <div>
        <Buttons updateActiveView={this.updateActiveView} />
        {this.state.activeView === 'portfolio' ?
          <Portfolio userId={userId} updatePortfolioId={this.updatePortfolioId} /> : <Transactions userId={userId} portfolioId={this.state.portfolioId} />
        }
      </div>
    );
  }
}

export default Home;
