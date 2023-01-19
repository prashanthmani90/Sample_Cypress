const url = "http://www.google.com";

describe("Google Search", () => {
  it("Search for Taylor & Francis and check results", () => {
    // Visit the given URL
    cy.visit("http://www.google.com");
    cy.wait(1000); // Wait for page to load (cookie preference)
    cy.get("[id=W0wltc]").click(); // Close the cookie preference
    cy.get('input[name="q"]').type("Taylor & Francis{enter}"); // Find the Seach Input Box and enter the given Text
    cy.get("#search a").should(($a) => {
      // Find all the search result <a> tags // id="search"
      let flag = false;
      $a.each((index, el) => {
        let link = el.href;
        // Check atleaset one entry has given condition
        if (
          link.includes("taylorandfrancis.com") ||
          link.includes("tandfonline.com") ||
          link.includes("routledge.com")
        ) {
          flag = true;
        }
      });
      expect(flag).to.be.true; // Expecting the result to be true
    });
  });
});
