describe('Movie List E2E', () => {
  beforeEach(() => {
    // Visit the app
    cy.visit('/');
  });

  it('renders the movie list and allows navigation', () => {
    // Wait for movies to load
    cy.get('.movie-card:not(.loading)', { timeout: 10000 }).should('have.length.at.least', 1);

    // Focus the first card explicitly for robust testing
    cy.get('.movie-card:not(.loading)').first().focus().should('have.focus');

    // Navigate Right
    cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
    cy.get('.movie-card:not(.loading)').eq(1).should('have.focus');

    // Navigate Left
    cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
    cy.get('.movie-card:not(.loading)').first().should('have.focus');
  });

  it('handles deliberate navigation rhythm (repeats only)', () => {
    cy.get('.movie-card:not(.loading)', { timeout: 10000 }).first().focus().should('have.focus');

    // Rapid double tap Right - Taps are currently UNTHROTTLED in codebase
    cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
    cy.get('.movie-card:not(.loading)').eq(1).should('have.focus');
    
    // This second tap moves to item 2 immediately because taps aren't throttled
    cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
    cy.get('.movie-card:not(.loading)').eq(2).should('have.focus');
  });

  it('handles held keys (repeat) correctly with 400ms throttle', () => {
    cy.get('.movie-card:not(.loading)', { timeout: 10000 }).first().focus().should('have.focus');
    
    // First repeat
    cy.focused().trigger('keydown', { key: 'ArrowRight', repeat: true, force: true });
    cy.get('.movie-card:not(.loading)').eq(1).should('have.focus');

    // Immediate second repeat - should be throttled (ignored)
    cy.focused().trigger('keydown', { key: 'ArrowRight', repeat: true, force: true });
    cy.get('.movie-card:not(.loading)').eq(1).should('have.focus'); // Still on 1

    // Wait for throttle (400ms)
    cy.wait(500);

    // Now it should move
    cy.focused().trigger('keydown', { key: 'ArrowRight', repeat: true, force: true });
    cy.get('.movie-card:not(.loading)').eq(2).should('have.focus');
  });
});
