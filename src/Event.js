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
              <p className="event-description">{event.description}</p>
              <a
                href={event.htmlLink}
                target="_blank"
                rel="noreferrer"
                className="event-htmlLink"
              >
                Go to Google Calendar for more details
              </a>
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