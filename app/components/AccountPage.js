import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/_AccountPage.scss';

class AccountPage extends Component {
  render() {
    return (
      <div id="AccountPage">
        <div className="container">
          <div className="hero-card card clearfix">
            <h3>My Polls</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AccountPage);
