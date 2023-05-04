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

  it('CRUD board worked', () => {
    // Create board
    cy.get('._top_k62l8_10 > ul > li:last-child > button').click();

    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form input[type="text"]').type('Test board');
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test board» was created successfully'
    );

    // Read board
    cy.get('._top_k62l8_10 > ul > li:first-child > button > span').should('include.text', 'Test board');

    // Update board
    cy.get('header ._other_vuxcw_19 > button').click();
    cy.get('header ._other_vuxcw_19 ._dropdown_1y21a_1 button:first-child').click();
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form input[type="text"]').type(' 2');
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form ._icons_1mali_1 > div > button:nth-child(2)').click();
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test board» was successfully changed'
    );

    // Read updated board
    cy.get('._top_k62l8_10 > ul > li:first-child > button > span').should('include.text', 'Test board 2');

    // Delete board
    cy.get('header ._other_vuxcw_19 ._dropdown_1y21a_1 ._delete_1y21a_10').click();
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();
    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test board 2» was successfully deleted'
    );
  });

  it.only('CRUD columns worked', () => {
    // Create board
    cy.get('._top_k62l8_10 > ul > li:last-child > button').click();

    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form input[type="text"]').type('Test board');
    cy.get('#overlay > ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The board «Test board» was created successfully'
    );

    // Create column
    cy.get('.swiper > .swiper-wrapper > div:last-child button').click();
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form label:first-child > input').type('Test column');
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    // Read column
    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The column «Test column» in the «Test board» has been created successfully'
    );

    // Change column
    cy.get('.swiper > .swiper-wrapper > div:first-child > article > header > button').click();
    cy.get(
      '.swiper > .swiper-wrapper > div:first-child > article > header > ._dropdown_1r8fa_1 > ._dropdown_16go4_1 > button:first-child'
    ).click();
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form label:first-child > input').type(' 2');
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();

    // Delete column
    cy.get(
      '.swiper > .swiper-wrapper > div:first-child > article > header > ._dropdown_1r8fa_1 > ._dropdown_16go4_1 > button:last-child'
    ).click();
    cy.get('#overlay ._frame_f7u2u_1 ._modal_f7u2u_10 form button[type="submit"]').click();
    cy.get('._success_1l9k5_10._message_1l9k5_1').should(
      'include.text',
      'The column «Test column 2» was successfully deleted'
    );
  });
});
