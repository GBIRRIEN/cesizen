describe('Réalisation complète d’un diagnostic', () => {
    it('L’utilisateur peut répondre à toutes les questions et obtenir un résultat final', () => {
      cy.visit('http://localhost:3000');
  
      cy.contains('Activités').click();
  
      cy.contains('Outil de diagnostic').click();
  
      cy.contains('Outil de diagnostic mental').should('be.visible');
      cy.contains('Cochez les affirmations qui vous correspondent en ce moment').should('be.visible');
  
      cy.get('div.cursor-pointer')
        .should('have.length.at.least', 3)
        .each(($el, index) => {
          if (index < 3) {
            cy.wrap($el).click();
          }
        });
  
      cy.contains('Soumettre').click();
  
      cy.contains('Diagnostic :').should('be.visible');
      cy.contains('Score obtenu :').should('be.visible');
    });
  });
  