import React, { Component } from 'react';

export class Event extends Component {
  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  state = { show: false };
  render() {
    const { event } = this.props;
    return (
      <>
        <div className="event">
          <h1 className="event-summary-title">{event.summary}</h1>
          <p className="event-info">
            {event.start.dateTime} {event.start.timeZone} {event.location}
          </p>
          {this.state.show && (
            <>
              <h2 className="event-about-title">Event information:</h2>
              <a
                href={event.htmlLink}
                target="_blank"
                className="event-htmlLink"
                rel="noopener noreferrer"
              >
                Go to Google Calendar for more details
              </a>
              <p className="event-description">{event.description}</p>
            </>
          )}
          {!this.state.show ? (
            <button
              className="event-showDetails-btn"
              onClick={this.toggleEventDetails}
            >
              click to see details
            </button>
          ) : (
            <button
              className="event-hideDetails-btn"
              onClick={this.toggleEventDetails}
            >
              click to hide details
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Event;