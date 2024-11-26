describe('Homepage', () => {
  it('should load the homepage', () => {
    cy.visit('/');
    cy.contains('Welcome to Next.js').should('exist');
    cy.contains('Get started').should('exist');
  });
});
