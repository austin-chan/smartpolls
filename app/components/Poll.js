import React, { Component, PropTypes } from 'react';
import '../styles/_Poll.scss';

export default class Poll extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="Poll">
        <div className="choice-labels">
          <div className="choice-label">
            <span className="vertical-aligner"></span>
            <span className="choice-label-text">A</span>
          </div>
          <div className="choice-label">
            <span className="vertical-aligner"></span>
            <span className="choice-label-text">B</span>
          </div>
          <div className="choice-label">
            <span className="vertical-aligner"></span>
            <span className="choice-label-text">C</span>
          </div>
          <div className="choice-label">
            <span className="vertical-aligner"></span>
            <span className="choice-label-text">D</span>
          </div>
          <div className="choice-label">
            <span className="vertical-aligner"></span>
            <span className="choice-label-text">E</span>
          </div>
        </div>
        <div className="baseline"></div>
        <div className="graph">
          <div className="graph-bars">
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar">
                <span className="percentage">67%</span>
                <span className="count">2 votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar">
                <span className="percentage">67%</span>
                <span className="count">2 votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar">
                <span className="percentage">67%</span>
                <span className="count">2 votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar">
                <span className="percentage">67%</span>
                <span className="count">2 votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar">
                <span className="percentage">67%</span>
                <span className="count">2 votes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="total-votes">3 votes</div>
      </div>
    );
  }
}
