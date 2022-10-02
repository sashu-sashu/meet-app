import React, { Component } from 'react';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

class App extends Component {
  // componentDidMount

  // // for localhost
  // componentDidMount() {
  //   this.mounted = true;
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       this.setState({ events, locations: extractLocations(events) });
  //     }
  //   });
  //   if (!navigator.onLine) {
  //     this.setState({
  //       warningText: "Your're offline! The data was loaded from the cache."
  //     });
  //   } else {
  //     this.setState({
  //       warningText: ''
  //     });
  //   }
  // }

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

  //getData
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(',').shift();
      return { city, number };
    });
    return data;
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
        <h1>Meet App</h1>
        <h4 className="nearCity-h4">Choose your nearest city</h4>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />

        <h4>Events in each city</h4>
        {/* Data Visualization - starts */}
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              type="number"
              dataKey="number"
              name="number of events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Data Visualization - ends */}

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
