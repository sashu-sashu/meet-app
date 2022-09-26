import React, { Component } from 'react';

export class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    this.props.updateEvents(undefined, event.target.value);
    const value = event.target.value;
    this.setState({ numOfEvents: value });
  };
  state = { numOfEvents: 32 };
  render() {
    return (
      <div className="numberOfEvents">
        <input
          type="number"
          className="number-input"
          placeholder="Enter number"
          value={this.state.numOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;