import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/_PollListPage.scss';

class PollListPage extends Component {
  render() {
    return (
      <div id="PollListPage">
        Testing
      </div>
    );
  }
}

export default connect()(PollListPage);
