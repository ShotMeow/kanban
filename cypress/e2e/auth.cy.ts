describe('Auth', () => {
  beforeEach(() => {
    cy.visit('https://kanban-shotmeow.vercel.app');
  });

  it('Redirect to Auth page if user not authorized', () => {
    cy.url().should('include', 'authorize');
  });

  it('Show forgot password modal', () => {
    cy.get('._form_1yf8n_1 ._actions_1yf8n_15 > button').click();
    cy.get('#overlay > ._frame_f7u2u_1 > ._modal_f7u2u_10');
  });

  it('Change authentication type worked', () => {
    cy.get('._state_1yf8n_36 > button').click();
    cy.get('._form_1hbi2_1');

    cy.get('._state_1hbi2_36 > button').click();
    cy.get('._form_1yf8n_1');
  });

  it('Password shown button worked', () => {
    cy.get('._form_1yf8n_1 ._field_f3780_1 > button').click();
    cy.get('._form_1yf8n_1 ._field_f3780_1 > input[type="text"]');

    cy.get('._form_1yf8n_1 ._field_f3780_1 > button').click();
    cy.get('._form_1yf8n_1 ._field_f3780_1 > input[type="password"]');
  });

  it('Authorize with remember worked', () => {
    cy.get('._form_1yf8n_1 ._field_f3780_1 input[type="email"]').type('test@example.com');
    cy.get('._form_1yf8n_1 ._field_f3780_1 input[type="password"]').type('password');

    cy.get('._form_1yf8n_1 button[type="submit"]').click();
    cy.get('._layout_1wedr_1');
    cy.get('._success_1l9k5_10._message_1l9k5_1');

    cy.reload();

    cy.get('._layout_1wedr_1');
  });

  it('Authorize without remember worked', () => {
    cy.get('._form_1yf8n_1 ._field_f3780_1 input[type="email"]').type('test@example.com');
    cy.get('._form_1yf8n_1 ._field_f3780_1 input[type="password"]').type('password');
    cy.get('._form_1yf8n_1 ._checkbox_e8lyb_1 button').click();

    cy.get('._form_1yf8n_1 button[type="submit"]').click();
    cy.get('._layout_1wedr_1');
    cy.get('._success_1l9k5_10._message_1l9k5_1');

    cy.reload();

    cy.get('._authorize_1wgo2_1');
  });
});
