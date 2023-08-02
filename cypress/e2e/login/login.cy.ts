
describe('Iniciar sesión', () => {
  it('Trata de iniciar sesion sin ingresar credenciales', () => {
    cy.visit('/login'); 
    cy.get('form').submit();
    cy.contains('El correo es obligatorio.').should('contain.text','El correo es obligatorio.')
    cy.contains('La contraseña es obligatoria.').should('contain.text','La contraseña es obligatoria.')
    cy.wait(2000);
  
  });
    it('Permite iniciar sesión con credenciales válidas', () => {
      cy.visit('/login');
  
      // Ingresa las credenciales válidas en el formulario y envía el formulario
      cy.get('input[formControlName="email"]').type('aguallogil_oscar@hotmail.com');
      cy.get('input[formControlName="password"]').type('1234');
      cy.get('form').submit();
      cy.wait(2000);
  
      cy.get('#table-search-meals').should('be.visible');
    });
  
    it('Ingresa credenciales no validas y verifica que este en misma ruta login', () => {
      cy.visit('/login'); 
      cy.get('input[formControlName="email"]').type('usuario-invalido@example.com');
      cy.get('input[formControlName="password"]').type('contraseña-incorrecta');
      cy.get('form').submit();
      cy.url().then((url) => {
        // Verificar si la URL coincide con la ruta esperada
        expect(url).to.include('/login');
      });
  
    });
  
  });