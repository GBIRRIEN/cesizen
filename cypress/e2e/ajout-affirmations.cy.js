describe('Non-régression : Réalisation complète d’un diagnostic après ajout d’une affirmation', () => {
    const adminEmail = 'birrienguillaume2@gmail.com';
    const adminPassword = 'motdepasseadmin';
    const newAffirmation = `Affirmation test ${Date.now()}`;
    const newPoints = 5;
  
    it('Ajout d’une affirmation et exécution d’un diagnostic incluant cette affirmation', () => {
        cy.visit('http://localhost:3000');

        cy.get('button').contains(/^Se connecter$/).click({ force: true });

        cy.get('input[type="email"]').should('be.visible').type(adminEmail);
        cy.get('input[type="password"]').should('be.visible').type(adminPassword);

        cy.get('.auth-modal form button[type="submit"]')
        .should('contain', 'Se connecter')
        .click();

        cy.url().should('include', '/');
  
      cy.contains('Activités').click();
      cy.contains('Outil de diagnostic').click();
  
      cy.contains('Gérer les affirmations').click();
  
      cy.get('input[placeholder="Nouvelle affirmation"]').type(newAffirmation);
      cy.get('input[placeholder="Points"]').clear().type(newPoints.toString());
      cy.contains('Ajouter').click();
  
        const encodedAffirmation = encodeURIComponent(newAffirmation)

      cy.get(`[data-testid="affirmation-libelle-${encodedAffirmation}"]`)
        .should('exist')
        .and('have.value', newAffirmation);

  
      cy.contains('Activités').click();
      cy.contains('Outil de diagnostic').click();
  
      cy.contains(newAffirmation).click();
  
      cy.contains('Soumettre').click();
  
      cy.contains('Diagnostic :').should('be.visible');
      cy.contains('Score obtenu :').should('contain', newPoints.toString());
    });
  });
  