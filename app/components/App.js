import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';
import Navigation from './Navigation';
import Login from './Login';
import '../styles/_App.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    showModal: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    console.log(this.props);
  }

  onRest() {
    console.log('here');
  }

  renderLogin() {
    const loginStyles = this.props.showModal ? [{
      key: 'login',
      style: { opacity: spring(1, presets.stiff) },
    }] : [];

    return (
      <TransitionMotion willEnter={this.willEnter} willLeave={this.willLeave} onRest={this.onRest} styles={loginStyles}>
        {interStyles =>
          <div>
            {interStyles.map(({ key, style }) => {
              return (<Login key={key} style={{ opacity: style.opacity }} />);
            })}
          </div>
        }
      </TransitionMotion>
    );
  }

  render() {
    return (
      <div id="App">
        <Navigation />
        <div className="page-content">
          {this.props.children}
        </div>
        <footer>Copyright © 2016 SmartPolls. All rights reserved.</footer>
        {this.renderLogin()}
      </div>
    );
  }

  willEnter() {
    return { opacity: 0 };
  }

  willLeave() {
    return { opacity: spring(0) };
  }
}

const mapStateToProps = (state) => {
  return {
    showModal: state.user.showModal,
  };
};

export default connect(mapStateToProps)(App);