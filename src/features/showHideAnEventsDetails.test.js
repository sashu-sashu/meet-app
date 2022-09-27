import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the home page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user browses the selected city', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    then(
      'the current events from this city will be minimized/hidden from the user',
      () => {
        AppWrapper.update();
        let EventWrapper = AppWrapper.find(Event);
        EventWrapper.forEach((event) =>
          expect(event.state('show')).toBe(false)
        );
        expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(
          mockData.length
        );
      }
    );
  });

  test('User can expand an event to see its details.', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given('the user clicks on the event button', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(
        1
      );
      expect(EventWrapper.find('.event .event-description')).toHaveLength(0);
    });

    when('user selects a specific event', () => {
      EventWrapper.find('.event-showDetails-btn').simulate('click');
    });

    then(
      'the details of this event will be listed for the user to view',
      () => {
        expect(EventWrapper.state('show')).toBe(true);
        expect(EventWrapper.find('.event .event-hideDetails-btn')).toHaveLength(
          1
        );
        expect(EventWrapper.find('.event .event-description')).toHaveLength(1);
      }
    );
  });

  test('User can collapse an event to hide its details.', ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given('the event item is open', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ show: true });
      expect(EventWrapper.state('show')).toBe(true);
      expect(EventWrapper.find('.event .event-hideDetails-btn')).toHaveLength(
        1
      );
      expect(EventWrapper.find('.event .event-description')).toHaveLength(1);
    });

    when('the user closes the event item', () => {
      EventWrapper.find('.event-hideDetails-btn').simulate('click');
    });

    then('the details are hidden', () => {
      expect(EventWrapper.state('show')).toBe(false);
      expect(EventWrapper.find('.event .event-showDetails-btn')).toHaveLength(
        1
      );
      expect(EventWrapper.find('.event .event-description')).toHaveLength(0);
    });
  });
});
