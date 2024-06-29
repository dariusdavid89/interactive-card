// type definitions for Cypress object "cy"
/// <reference types="cypress" />
describe("form validiti", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5501/index.html");
	});
	it("should show error", () => {
		cy.get(".input-name").focus().blur();
		cy.get(".name-error").should("have.text", "Can't be blank");

		cy.get(".input-name").focus().type("   ").blur();
		cy.get(".name-error").should("have.text", "Can't be blank");

		cy.get(".input-month").focus().blur();
		cy.get(".date-error").should("have.text", "Can't be blank");

		cy.get(".input-month").focus().type("1").blur();
		cy.get(".date-error").should("have.text", "invalid number");

		cy.get(".input-year").focus().blur();
		cy.get(".date-error").should("have.text", "Can't be blank");

		cy.get(".input-year").focus().type("1").blur();
		cy.get(".date-error").should("have.text", "invalid number");

		cy.get(".input-cvc").focus().blur();
		cy.get(".cvc-error").should("have.text", "Can't be blank");
	});
});
