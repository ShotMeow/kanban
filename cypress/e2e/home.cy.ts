describe('Home', () => {
  beforeEach(() => {
    cy.visit('https://kanban-shotmeow.vercel.app');
    cy.viewport(1920, 1080);

    cy.get('._form_1yf8n_1 ._field_f3780_1 input[type="email"]').type('test@example.com');
    cy.get('._form_1yf8n_1 ._field_f3780_1 input[type="password"]').type('password');

    cy.get('._form_1yf8n_1 button[type="submit"]').click();
    cy.wait(5000);
  });

  it('Color theme changer worked', () => {
    cy.get('._switcher_1aerv_1 button[role="switch"]').click();
    cy.get('html.light');

    cy.get('._switcher_1aerv_1 button[role="switch"]').click();
    cy.get('html.dark');
  });

  it('Hide sidebar worked', () => {
    cy.get('._bottom_k62l8_54 > button').click();
    cy.get('aside._smallest_k62l8_74');

    cy.get('._bottom_k62l8_54 > button').click();
    cy.get('aside:not(._smallest_k62l8_74)');
  });

  it.only('CRUD board worked', () => {
    cy.get('._top_k62l8_10 > ul > li:last-child > button').click();

    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form input[type="text"]').type('Test Title');
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test Title» was created successfully'
    );
    cy.get('._top_k62l8_10 > ul > li:nth-last-child(2) > button > span').should('include.text', 'Test Title');

    cy.get('header ._other_vuxcw_19 > button').click();
    cy.get('header ._other_vuxcw_19 ._dropdown_1y21a_1 button:first-child').click();
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form input[type="text"]').type(' 2');
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form ._icons_1mali_1 > div > button:nth-child(2)').click();
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test Title» was successfully changed'
    );
    cy.get('._top_k62l8_10 > ul > li:nth-last-child(2) > button > span').should('include.text', 'Test Title 2');

    cy.get('header ._other_vuxcw_19 ._dropdown_1y21a_1 ._delete_1y21a_10').click();
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();
    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test Title 2» was successfully deleted'
    );
  });
});
