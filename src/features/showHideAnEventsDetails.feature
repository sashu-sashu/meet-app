Feature: Show/hide event details
  Scenario: An event element is collapsed by default.
    Given the home page is open
    When the user browses the selected city
    Then the current events from this city will be minimized/hidden from the user

  Scenario: User can expand an event to see its details.
    Given the user clicks on the event button
    When the user selects a specific event
    Then the details of this event will be listed for the user to view

  Scenario: User can collapse an event to hide its details.
    Given the event item is open
    When the user closes the event item
    Then the details are hidden