import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';
import pluralize from 'pluralize';
import '../styles/_Poll.scss';

export default class Poll extends Component {
  static propTypes = {
    hideTotal: PropTypes.bool,
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps || !nextProps.options) return;
    const { options, results } = nextProps;

    this.setState({
      count: options.split('-').length,
      results: results.split('-'),
    });
  }

  getTotalVotes() {
    return this.state.results.reduce((sum, a) => (Number(sum) + Number(a)));
  }

  getVotePercentage(index) {
    const votes = this.state.results[index];
    const total = this.getTotalVotes();

    if (!total) return 0;
    return Math.round((votes / total).toFixed(2) * 100);
  }

  renderBarForLetter(index) {
    const count = this.state.results[index];
    const percentage = this.getVotePercentage(index);
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

      <div className="graph-bar-wrap" key={index}>
        <span className="vertical-aligner"></span>
        <Motion style={{ width: spring(percentage, presets.noWobble) }}>
          {({ width }) =>
            <div className="graph-bar" style={{ width: `${width}%` }}>
              <span className="percentage">{innerBarLabel}</span>
              <span className="count">{outerBarLabel}</span>
            </div>
          }
        </Motion>
      </div>
    );
  }

  renderLabels() {
    const labels = [
      <div className="choice-label" key="A">
        <span className="vertical-aligner"></span>
        <span className="choice-label-text">A</span>
      </div>,
      <div className="choice-label" key="B">
        <span className="vertical-aligner"></span>
        <span className="choice-label-text">B</span>
      </div>,
      <div className="choice-label" key="C">
        <span className="vertical-aligner"></span>
        <span className="choice-label-text">C</span>
      </div>,
      <div className="choice-label" key="D">
        <span className="vertical-aligner"></span>
        <span className="choice-label-text">D</span>
      </div>,
      <div className="choice-label" key="E">
        <span className="vertical-aligner"></span>
        <span className="choice-label-text">E</span>
      </div>,
    ];

    return labels.slice(0, this.state.count);
  }

  renderBars() {
    const list = [];
    for (let n = 0; n < this.state.count; n++) {
      list.push(this.renderBarForLetter(n));
    }

    return list;
  }

  render() {
    let totalVotes;

    if (!this.props.hideTotal) {
      totalVotes = (<div className="total-votes">{this.getTotalVotes()} votes</div>);
    }

    return (
      <div className="Poll">
        <div className="choice-labels">
          {this.renderLabels()}
        </div>
        <div className="baseline"></div>
        <div className="graph">
          <div className="graph-bars">
            {this.renderBars()}
          </div>
        </div>
        {totalVotes}
      </div>
    );
  }
}
