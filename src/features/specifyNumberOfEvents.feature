Feature: Specify number of events

  Scenario: When user hasn’t specified a number, 32 is the default number.
    Given the user searched for event search results for a city
    When the user does not select a specific number of search results
    Then the default number of search results for each city will be 32

  Scenario: User can change the number of events they want to see.
    Given the user user opened a search results query
    When the user changes the default number of results
    Then the default number of results will be changed to whatever the user chooses