import React from 'react';
import { Row, Col, Toast } from 'react-bootstrap';

class ResultToast extends React.Component {
  state = {
    show: this.props.data.show
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    });
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.props.data.show !== prevProps.data.show) {
      this.setState({
        show: this.props.data.show
      });
    }
  }

  render() {
    return (
      <Row className="ResultToast">
        <Col xs={6}>
          <Toast show={this.state.show} onClose={this.toggleShow}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{this.props.data.header}</strong>
            </Toast.Header>
            <Toast.Body>{this.props.data.message}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
}

export default ResultToast;
