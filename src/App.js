import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  // componentDidMount
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    // const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    let isTokenValid;
    if (accessToken && !navigator.onLine) {
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        warningText: "Your're offline! The data was loaded from the cache.",
      });
    } else {
      this.setState({
        warningText: '',
      });
    }
  }

  //componentWillUnmount
  componentWillUnmount() {
    this.mounted = false;
  }

  // update events
  updateEvents = (location, eventCount) => {
    if (!location) location = 'all';
    !eventCount
      ? (eventCount = this.state.numberOfEvents)
      : this.setState({ numberOfEvents: eventCount });
    // if (location === undefined) {
    //   location = this.state.seletedLocation;
    // }
    // if (eventCount === undefined) {
    //   eventCount = this.state.numberOfEvents;
    // }
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents.slice(0, eventCount),
        // numberOfEvents: eventCount,
        // seletedLocation: location
      });
    });
  };

  //states
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    seletedLocation: 'all',
    warningText: '',
    showWelcomeScreen: undefined,
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    return (
      <div className="App">
        <WarningAlert text={this.state.warningText}></WarningAlert>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        {/* welocome screen  */}
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
