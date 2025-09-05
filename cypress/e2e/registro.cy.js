// Evitar que errores de React rompan los tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Registro de usuario nuevo', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser')
  });

  it('Debe permitir registrar un usuario nuevo con datos válidos', () => {
    cy.get('input[name="nombres"]').type('Tester');
    cy.get('input[name="apellido"]').type('Nuevo');
    cy.get('input[name="telefono"]').type('1234567890');
    cy.get('input[name="dni"]').type('35184645'); // un DNI válido y único

    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('Santa Fe').click();

    cy.get('[data-cy="select-localidad"]').click().type('Rosario');
    cy.contains('.cursor-pointer', 'Rosario').click();

    cy.contains('dd').type('10');
    cy.contains('mm').type('08');
    cy.contains('aaaa').type('1995');

    cy.get('input[name="email"]').type('usuarioNuevo@ejemplo.com');
    cy.get('input[name="confirmarEmail"]').type('usuarioNuevo@ejemplo.com');
    cy.get('input[name="password"]').type('ContraseñaSegura123');
    cy.get('[data-cy="input-repetir-password"]').type('ContraseñaSegura123');
    cy.get('button[type="submit"]').click();

    cy.contains('Registro exitoso').should('be.visible');
  });
});
