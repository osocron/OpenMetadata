/*
 *  Copyright 2023 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { interceptURL, verifyResponseStatusCode } from './common';

export const openFilterDropdown = (asset, filter) => {
  interceptURL(
    'GET',
    `http://localhost:8585/api/v1/search/aggregate?index=${asset.searchIndex}&field=${filter.key}`,
    'aggregateAPI'
  );

  // Click on desired dropdown
  cy.get(`[data-testid="search-dropdown-${filter.label}"]`)
    .should('exist')
    .and('be.visible')
    .click();

  verifyResponseStatusCode('@aggregateAPI', 200);

  cy.get('[data-testid="drop-down-menu"]').should('exist').and('be.visible');
};

export const searchAndClickOnOption = (
  optionName,
  optionTestId,
  checkedAfterClick
) => {
  // Search for filter
  cy.get('[data-testid="search-input"]')
    .should('exist')
    .and('be.visible')
    .clear()
    .type(optionName);

  cy.get(`[data-testid="${optionTestId}"]`)
    .should('exist')
    .and('be.visible')
    .click();

  checkCheckboxStatus(`${optionTestId}-checkbox`, checkedAfterClick);
};

export const checkCheckboxStatus = (boxId, isChecked) => {
  cy.get(`[data-testid="${boxId}"]`)
    .should('exist')
    .and(`${isChecked ? 'be' : 'not'}.checked`);
};
