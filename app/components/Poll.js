import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import '../styles/_Poll.scss';

export default class Poll extends Component {
  static propTypes = {
    aCount: PropTypes.number.isRequired,
    bCount: PropTypes.number.isRequired,
    cCount: PropTypes.number.isRequired,
    dCount: PropTypes.number.isRequired,
    eCount: PropTypes.number.isRequired,
    hideTotal: PropTypes.bool,
  }

  componentWillMount() {
  }

  getTotalVotes() {
    const { aCount, bCount, cCount, dCount, eCount } = this.props;
    return aCount + bCount + cCount + dCount + eCount;
  }

  getVotePercentage(letter) {
    const votes = this.props[`${letter.toLowerCase()}Count`];
    const total = this.getTotalVotes();

    if (!total) return 0;
    return Math.round((votes / total).toFixed(2) * 100);
  }

  renderBarForLetter(letter) {
    const count = this.props[`${letter}Count`];
    const percentage = this.getVotePercentage(letter);
    let innerBarLabel = `${percentage}%`;
    let outerBarLabel = `${count} ${pluralize('vote', count)}`;

    // handle high percentage cases
    if (percentage >= 93) {
      innerBarLabel = `${innerBarLabel} - ${outerBarLabel}`;
      outerBarLabel = '';
    } else if (percentage <= 5) {
      innerBarLabel = '';
    }

    return (
      <div className="graph-bar-wrap">
        <span className="vertical-aligner"></span>
        <div className="graph-bar" style={{ width: `${percentage}%` }}>
          <span className="percentage">{innerBarLabel}</span>
          <span className="count">{outerBarLabel}</span>
        </div>
      </div>
    );
  }

  render() {
    let totalVotes;

    if (!this.props.hideTotal) {
      totalVotes = (<div className="total-votes">{this.getTotalVotes()} votes</div>);
    }

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
            {this.renderBarForLetter('a')}
            {this.renderBarForLetter('b')}
            {this.renderBarForLetter('c')}
            {this.renderBarForLetter('d')}
            {this.renderBarForLetter('e')}
          </div>
        </div>
        {totalVotes}
      </div>
    );
  }
}
