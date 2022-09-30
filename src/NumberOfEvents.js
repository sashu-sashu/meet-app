import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    if (event.target.value < 1 || event.target.value > 32) {
      this.setState({
        numOfEvents: event.target.value,
        errorText: 'Please enter a number between 1 and 32',
      });
    } else {
      this.props.updateEvents(undefined, event.target.value);
      const value = event.target.value;
      this.setState({ numOfEvents: value, errorText: '' });
    }
  };

  state = { numOfEvents: 32, errorText: '' };
  render() {
    return (
      <div className="numberOfEvents">
        <label>
          Number of Events:
          <input
            type="number"
            className="number-input"
            placeholder="Enter number"
            value={this.state.numOfEvents}
            onChange={this.handleInputChanged}
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
