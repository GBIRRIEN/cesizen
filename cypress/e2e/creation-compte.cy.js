describe('Création d\'un compte utilisateur', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Doit permettre à un utilisateur de créer un compte', () => {
    cy.get('button').contains('Se connecter').click({ force: true });

    cy.get('.auth-modal').should('be.visible');

    cy.get('button').contains('Créer un compte').click();

    cy.get('input[placeholder="Nom"]').should('be.visible');
    cy.get('input[placeholder="Prénom"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Mot de passe"]').should('be.visible');

    const email = `test${Date.now()}@gmail.com`;
    const password = 'TestPassword123';
    const nom = 'Test';
    const prenom = 'Utilisateur';

    cy.get('input[placeholder="Nom"]').type(nom);
    cy.get('input[placeholder="Prénom"]').type(prenom);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Mot de passe"]').type(password);

    cy.get('button').contains("S'inscrire").click();

    cy.get('p').contains('Compte créé ! Vérifie ta boîte mail pour valider ton adresse.')
      .should('be.visible');

    cy.url().should('not.include', '/signup');
  });
});
