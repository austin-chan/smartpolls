import React, { Component, PropTypes } from 'react';
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

  render() {
    const { aCount, bCount, cCount, dCount, eCount, hideTotal } = this.props;
    const aPercentage = this.getVotePercentage('a');
    const bPercentage = this.getVotePercentage('b');
    const cPercentage = this.getVotePercentage('c');
    const dPercentage = this.getVotePercentage('d');
    const ePercentage = this.getVotePercentage('e');
    let totalVotes;

    if (!hideTotal) totalVotes = (<div className="total-votes">{this.getTotalVotes()} votes</div>);

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
              <div className="graph-bar" style={{ width: `${aPercentage}%` }}>
                <span className="percentage">{aPercentage}%</span>
                <span className="count">{aCount} votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar" style={{ width: `${bPercentage}%` }}>
                <span className="percentage">{bPercentage}%</span>
                <span className="count">{bCount} votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar" style={{ width: `${cPercentage}%` }}>
                <span className="percentage">{cPercentage}%</span>
                <span className="count">{cCount} votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar" style={{ width: `${dPercentage}%` }}>
                <span className="percentage">{dPercentage}%</span>
                <span className="count">{dCount} votes</span>
              </div>
            </div>
            <div className="graph-bar-wrap">
              <span className="vertical-aligner"></span>
              <div className="graph-bar" style={{ width: `${ePercentage}%` }}>
                <span className="percentage">{ePercentage}%</span>
                <span className="count">{eCount} votes</span>
              </div>
            </div>
          </div>
        </div>
        {totalVotes}
      </div>
    );
  }
}
