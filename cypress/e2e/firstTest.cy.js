describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://localhost:3000')

    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="/equipment"]').click()
    cy.get('[data-cy="all-equipments"]').click()
    cy.get('[data-cy="eq-filter-all_equipments"]').click()
  })
})