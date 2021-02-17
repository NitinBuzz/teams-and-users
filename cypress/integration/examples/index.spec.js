/// <reference types="cypress" />

const URL = "http://localhost:3000"; 

describe("divvysba-dev.revenuedlocal", () => {
  it('should be able to provide data and navigate to proceeding steps', () => {
    cy.visit(URL);
    cy.wait(3000);
    cy.get('*[class^="list-group"]').find('.team-details').should('have.length', 4)
    cy.get(`input[id=filter]`).first().focus().type("11/11/1991", { delay: 150 });
  })
});