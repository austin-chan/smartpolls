import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';
import Navigation from './Navigation';
import Login from './Login';
import '../styles/_App.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    showLogin: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    const loginStyles = this.props.showLogin ? [{
      key: 'login',
      style: { opacity: spring(1, presets.stiff) },
    }] : [];

    return (
      <div id="App">
        <Navigation />
        <div className="page-content">
          {this.props.children}
        </div>
        <footer>Copyright © 2016 SmartPolls. All rights reserved.</footer>
        <TransitionMotion willEnter={this.willEnter} willLeave={this.willLeave} styles={loginStyles}>
          {interStyles =>
            <div>
              {interStyles.map(({ key, style }) => {
                return (<Login key={key} style={{ opacity: style.opacity }} />);
              })}
            </div>
          }
        </TransitionMotion>
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
    showLogin: state.user.showLogin,
  };
};

export default connect(mapStateToProps)(App);
