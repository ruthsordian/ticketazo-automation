// Ignorar errores de React minificados que no son del test
Cypress.on('uncaught:exception', () => false);

// Helper: espera a que el selector esté visible y habilitado, y recién escribe
const typeWhenEnabled = (selector, text) => {
  cy.get(selector, { timeout: 20000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click()
    .clear()
    .type(text, { delay: 0 });
};

describe('Registro de usuario nuevo', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser');

    // Asegura que el formulario está montado (botón visible)
    cy.contains('button', 'Registrarse', { timeout: 20000 }).should('be.visible');
  });

  it('Completa y envía el formulario', () => {
    const dni = `${Date.now()}`.slice(-8); // DNI único
    const email = `qa+${Date.now()}@ejemplo.com`;
    const password = 'Password123*';

    // Datos personales
    typeWhenEnabled('input[name="nombres"]', 'Usuario');
    typeWhenEnabled('input[name="apellido"]', 'Nuevo');
    typeWhenEnabled('input[name="telefono"]', '2616885427');
    typeWhenEnabled('[data-cy="input-dni"]', dni);

    // Provincia y localidad
 


    // Fecha de nacimiento
    typeWhenEnabled('input[placeholder="dd"]', '25');
    typeWhenEnabled('input[placeholder="mm"]', '05');
    typeWhenEnabled('input[placeholder="aaaa"]', '1980');

    // Credenciales
    typeWhenEnabled('input[name="email"]', email);
    typeWhenEnabled('input[name="confirmarEmail"]', email);
    typeWhenEnabled('input[name="password"]', password);
    typeWhenEnabled('[data-cy="input-repetir-password"]', password);

    // Enviar formulario
    cy.contains('button', 'Registrarse').click();

    // Validación post-envío (ajustar según mensaje real de Ticketazo)
    cy.contains(/registro exitoso/i).should('be.visible');
  });
});
