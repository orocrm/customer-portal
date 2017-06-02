@fixture-CustomerUserAddressFixture.yml
Feature: Delete customer user default address

  Scenario: Delete customer user default address
    Given I login as administrator
    And I go to Customers / Customer Users
    Then I click on AmandaRCole@example.org in grid
    And I should see "801 Scenic Hwy"
    And I should see "23400 Caldwell Road"
    And I should see "34500 Capitol Avenue"
    Then I delete 801 Scenic Hwy address
    And I should not see "801 Scenic Hwy"
    And I should see "23400 Caldwell Road"
    And I should see "34500 Capitol Avenue"
    Then I reload the page
    And I should not see "801 Scenic Hwy"
    And I should see "23400 Caldwell Road"
    And I should see "34500 Capitol Avenue"
