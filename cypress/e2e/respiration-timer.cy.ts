describe('Démarrage d’un exercice de respiration', () => {
    it('L’utilisateur peut démarrer un exercice, le timer fonctionne et peut être arrêté', () => {
      cy.visit('http://localhost:3000');

      cy.contains('Activités').click();
  
      cy.contains('Exercices de respiration').click();
  
      cy.contains('Choisissez un exercice de respiration').should('be.visible');
  
      cy.contains('Choisir').first().click();
  
      cy.contains(/Exercice \d+/).should('be.visible');
      cy.contains('Démarrer l\'exercice').should('be.visible');
  
      cy.contains('Démarrer l\'exercice').click();
  
      cy.get('[data-testid="timer"]', { timeout: 7000 }).should('be.visible').invoke('text').then((initialTimeText) => {
        const initialTime = parseInt(initialTimeText);
  
        cy.wait(3000);
  
        cy.get('[data-testid="timer"]', { timeout: 7000 }).should('be.visible').invoke('text').then((currentTimeText) => {
          const currentTime = parseInt(currentTimeText);
          expect(currentTime).to.be.lessThan(initialTime);
  
          cy.contains('Arrêtez l\'exercice').click();
  
          cy.contains('Démarrer l\'exercice').should('be.visible');
        });
      });
    });
  });
  