import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 is the default number.', ({
    given,
    when,
    then,
  }) => {
    given('the user searched for event search results for a city', () => {});

    let AppWrapper;
    when('the user does not select a specific number of search results', () => {
      AppWrapper = mount(<App />);
    });

    then(
      'the default number of search results for each city will be 32',
      () => {
        AppWrapper.update();
        expect(AppWrapper.state('numberOfEvents')).toBe(32);
      }
    );
  });

  test('User can change the number of events they want to see.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user opened a search results query', () => {
      AppWrapper = mount(<App />);
    });

    and(
      'the list of elements has been loaded and the user did not specify a number of events he wants to see',
      () => {}
    );

    when('the user changes the default number of results', () => {
      AppWrapper.update();
      let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
      const eventObject = { target: { value: 8 } };
      NumberOfEventsWrapper.find('.number-input').simulate(
        'change',
        eventObject
      );
    });

    then(
      'the default number of results will be changed to whatever the user chooses',
      () => {
        expect(AppWrapper.state('numberOfEvents')).toBe(6);
      }
    );
  });
});
