// Ignorar errores de React minificados que no son del test
Cypress.on('uncaught:exception', () => false);

// Helper: espera a que el selector esté visible y habilitado, y recién escribe
const typeWhenEnabled = (selector, text) => {
  cy.get(selector, { timeout: 20000 })
    .should('be.visible')
    .and('not.be.disabled')                       // <— clave para evitar tu error
    .click({ force: true })
    .clear({ force: true })
    .type(text, { delay: 0 });
};

describe('Registro de usuario nuevo', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser');

    // Asegura que el formulario está montado (botón visible)
    cy.contains('button', 'Registrarse', { timeout: 20000 }).should('be.visible');
  });

  it('Completa y envía el formulario', () => {
    const dni = `${Date.now()}`.slice(-8);                 // DNI único por corrida
    const email = `qa+${Date.now()}@ejemplo.com`;
    const password = 'ContraseniaSegura123';

    // Texto
    typeWhenEnabled('input[name="nombres"]', 'Tester');
    typeWhenEnabled('input[name="apellido"]', 'Nuevo');
    typeWhenEnabled('input[name="telefono"]', '1122334455');

    // DNI — usa el data-cy exacto de tu captura
    typeWhenEnabled('[data-cy="input-dni"]', dni);

    // Provincia y localidad (mismo patrón que tu código original)
    cy.get('[data-cy="select-provincia"]').click({ force: true });
    cy.contains('Córdoba').click({ force: true });                 // cambia si querés otra

    cy.get('[data-cy="select-localidad"]').click({ force: true }).type('Córdoba');
    cy.contains('.cursor-pointer', 'Córdoba').click({ force: true });

    // Fecha
    typeWhenEnabled('input[placeholder="dd"]', '10');
    typeWhenEnabled('input[placeholder="mm"]', '08');
    typeWhenEnabled('input[placeholder="aaaa"]', '1995');

    // Credenciales
    typeWhenEnabled('input[name="email"]', email);
    typeWhenEnabled('input[name="confirmarEmail"]', email);
    typeWhenEnabled('input[name="password"]', password);
    typeWhenEnabled('[data-cy="input-repetir-password"]', password);

    // Enviar
    cy.contains('button', 'Registrarse').click({ force: true });
  });
});

