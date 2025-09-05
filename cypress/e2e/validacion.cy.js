// Evitar que errores de React rompan los tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Validar que no se repitan DNI y no deje registrar', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser')
  });

  it('No debe permitir registrar con un DNI ya existente', () => {
    cy.get('input[name="nombres"]').type('Tester');
    cy.get('input[name="apellido"]').type('Duplicado');
    cy.get('input[name="telefono"]').type('1234567890');
    cy.get('input[name="dni"]').type('12345678'); // DNI ya registrado

    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('Córdoba').click();

    cy.get('[data-cy="select-localidad"]').click().type('Córdoba');
    cy.contains('.cursor-pointer', 'Córdoba').click();

    cy.contains('dd').type('07');
    cy.contains('mm').type('12');
    cy.contains('aaaa').type('1995');

    cy.get('input[name="email"]').type('duplicado@ejemplo.com');
    cy.get('input[name="confirmarEmail"]').type('duplicado@ejemplo.com');
    cy.get('input[name="password"]').type('ContraseñaSegura123');
    cy.get('[data-cy="input-repetir-password"]').type('ContraseñaSegura123');
    cy.get('button[type="submit"]').click();

    cy.contains('Ya existe un usuario registrado con ese DNI').should('be.visible');
  });
});
