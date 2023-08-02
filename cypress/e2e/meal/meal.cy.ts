describe('MealComponent', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[formControlName="email"]').type('aguallogil_oscar@hotmail.com');
        cy.get('input[formControlName="password"]').type('1234');
        cy.get('form').submit();
        cy.wait(2000);
    
        cy.get('#table-search-meals').should('be.visible');
      });
    it('debería mostrar el formulario al hacer clic en el botón "Add New"', () => {
      cy.get('button').contains('Add New').click();
      cy.get('#editUserModal').should('be.visible');
    });
  
    it('debería llenar y enviar el formulario correctamente', () => {
      cy.get('button').contains('Add New').click();
  
      // Llena el formulario con datos válidos
      cy.get('#name').type('Comida de ejemplo');
      cy.get('#price').type('10');
      cy.get('#description').type('Descripción de ejemplo');
  
      // Envía el formulario
      cy.get('button').contains('Save').click();
      cy.wait(1000);
      cy.get('button').contains('Aceptar').click();
      cy.wait(1000);
      cy.get('button').contains('Aceptar').click();
      cy.get('#editUserModal').should('not.be.visible');
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('debería editar una comida existente', () => {
      cy.get('tbody tr').last().as('comidaExistente');
  
      cy.get('@comidaExistente').find('td').contains('Edit').click();
      cy.get('#name').type('Comida de ejemplo modificada');
      cy.get('#price').type('100');
      cy.get('#description').type('Descripción de ejemplo modifiacada');
  
      // Envía el formulario
      cy.get('button').contains('Save').click();
      cy.wait(1000);
      cy.get('button').contains('Aceptar').click();
      cy.get('#editUserModal').should('not.be.visible');
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('debería eliminar una comida existente', () => {
      cy.get('tbody tr').last().as('comidaExistente');
  
      cy.get('@comidaExistente').find('td').contains('Delete').click();
      cy.get('button').contains('Aceptar').click();
      cy.wait(1000);
      cy.get('button').contains('Aceptar').click();
    });
  
 });
  