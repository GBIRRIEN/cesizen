describe('Connexion et déconnexion utilisateur', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Doit permettre à un utilisateur de se connecter et se déconnecter correctement', () => {
    cy.get('button').contains(/^Se connecter$/).click({ force: true });

    cy.get('input[type="email"]').should('be.visible').type('guiguitoguigs@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('motdepasse');

    cy.get('.auth-modal form button[type="submit"]')
      .should('contain', 'Se connecter')
      .click();

    cy.url().should('include', '/');
    cy.contains('a', 'Mon compte', { timeout: 10000 }).should('be.visible');

    cy.contains('a', 'Mon compte', { timeout: 10000 }).click({ force: true});
    cy.get('button').contains('Se déconnecter').click();

    cy.url().should('include', '/');
  });
});
