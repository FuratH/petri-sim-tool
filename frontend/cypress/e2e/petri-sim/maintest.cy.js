beforeEach(() => {

    // open frontend with new project:
    cy.visit('http://localhost:3000')
    cy.findByText("Start new project").click()
    cy.findByText("Start parametrization").click()
    cy.findByRole('textbox', { name: /projectname:/i }).type('testProject')
    cy.findByRole('button', { name: /save/i }).click()

})


describe('Change BPMN', () => {
    it('loads successfully', () => {

        cy.visit('http://localhost:3000/modelbased')
        cy.findByRole('textbox', { name: /bpmn name/i }).should('have.attr', 'placeholder', "pizza_order (1)")
        cy.findByRole('button', { name: /bpmn switcher/i }).click()
        cy.findByRole('menuitem', { name: /pizza_order \(2\)/i }).click()
            //cy.findByRole('menuitem', { name: /pizza_order (2)/i })
        cy.findByRole('textbox', { name: /bpmn name/i }).should('have.attr', 'placeholder', "pizza_order (2)")

    })
})

describe('clicking through pages', () => {

    it('shows scenario parameters page', () => {
        cy.findByRole('button', { name: /scenario parameters/i }).click()
        cy.url().should('eq', 'http://localhost:3000/scenario')
    })
    it('shows resource parameters page', () => {
        cy.findByRole('button', { name: /resource parameters/i }).click()
        cy.url().should('eq', 'http://localhost:3000/resource')
    })
    it('shows model based parameters page', () => {
        cy.findByRole('button', { name: /modelbased parameters/i }).click()
        cy.url().should('eq', 'http://localhost:3000/modelbased')
    })
})

describe('Modelbased Parameters', () => {
    beforeEach(() => {
        cy.findByRole('button', { name: /modelbased parameters/i }).click()
    })
    it('changes the view', () => {
        // from model based view to table view and back:
        cy.findByText("View").click()
        cy.findByText("Table").click()
        cy.url().should('eq', 'http://localhost:3000/modelbased/tableview')
        cy.findByText("View").click()
        cy.findByText("Model").click()
        cy.url().should('eq', 'http://localhost:3000/modelbased')
    })
})
describe('Modelbased Parameters: Table View', () => {
    beforeEach(() => {
        cy.findByRole('button', { name: /modelbased parameters/i }).click()
        cy.findByText("View").click()
        cy.findByText("Table").click()
    })
    it('changes to edit mode in table view', () => {
        cy.findAllByRole('textbox').eq(2).should('not.exist')
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findAllByRole('textbox').eq(2).should('exist')
    })
    it('changes one numerical parameter in table view', () => {
        cy.findByText("42").should('not.exist')
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findAllByRole('textbox').eq(2).clear().type('42')
        cy.findByRole('button', { name: /view mode/i }).click()
        cy.findByText("42").should('exist')
    })
    it('changes one dropdown parameter in table view', () => {
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findByText("secs").should('not.exist')
        cy.findAllByRole('cell', { name: /minutes/i }).eq(0).click().findByRole('combobox').select('Seconds')
        cy.findByRole('button', { name: /view mode/i }).click()
        cy.findAllByText("secs").eq('0').should('exist')
        cy.findAllByText("secs").eq('1').should('not.exist')
    })
    it('changes to view mode in table view', () => {
        cy.findByRole('button', { name: /edit mode/i }).click()
        cy.findByRole('button', { name: /view mode/i }).click()
        cy.findAllByRole('textbox').eq(2).should('not.exist')
    })
    it('finds headings for activities, gateways, events', () => {
        cy.findByRole('heading', { name: /Activities/i })
        cy.findByRole('heading', { name: /Gateways/i })
        cy.findByRole('heading', { name: /Events/i })
    })
})