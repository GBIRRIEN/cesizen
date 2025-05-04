describe('Non-régression : Dernier article affiché après ajout', () => {
    const email = 'birrienguillaume2@gmail.com';
    const password = 'motdepasseadmin';
    const uniqueSuffix = Date.now();
    const newArticle = {
      title: `Test Article ${uniqueSuffix}`,
      resume: 'Résumé de test Cypress',
      image: 'https://via.placeholder.com/150',
      link: 'https://example.com',
    };
  
    it("Ajoute un article et vérifie qu'il apparaît sur l'accueil", () => {
      cy.visit('http://localhost:3000');
  
      cy.contains('Se connecter').click();
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      cy.contains('a', 'Mon compte', { timeout: 10000 }).click({ force: true});
  
      cy.contains('Gérer les articles').click();
  
      cy.contains('Ajouter un article').click();
  
      cy.get('input[placeholder="Titre"]').type(newArticle.title);
      cy.get('input[placeholder="Résumé"]').type(newArticle.resume);
      cy.get('input[placeholder="Lien de l\'image"]').type(newArticle.image);
      cy.get('input[placeholder="Lien de l\'article"]').type(newArticle.link);
  
      cy.get('[class*="cursor-pointer px-3 py-1"]').first().click();
  
      cy.contains("Ajouter l'article").click();
  
      cy.get('a[href="/"]').first().click();
  
      cy.contains(newArticle.title).should('exist');
      cy.contains(newArticle.resume).should('exist');
    });
  });
  