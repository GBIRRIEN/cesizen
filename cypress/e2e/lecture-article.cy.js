describe('Lecture d’un article complet', () => {
    it('Vérifie que l’utilisateur est redirigé vers la page de l’article après avoir cliqué sur "Lire l\'article"', () => {
      cy.visit('http://localhost:3000');
  
      cy.contains('Articles').click();
  
      cy.contains('Articles ZEN');
  
      cy.get('a')
        .contains("Lire l'article")
        .first()
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.include('https://www.qare.fr/sante/surmenage');
  
          cy.request(href).its('status').should('eq', 200);
  
          cy.visit(href);
        });
    });
  });
  