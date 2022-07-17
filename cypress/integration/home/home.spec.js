
describe('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display welcome message', () => {
        cy.contains('iCog Labs');
        cy.contains('Internship Assesment');
        cy.contains('Berfore We begin');
    });
    it('should list the rules of the examination', () => {
        cy.get('.ant-list-item').should('have.length', 5)
    })
    it('should show a button ', () => {
        cy.get('.ant-btn').within(() => {
            cy.get('span').type('Next')
        })
    })
    it('should open a modal when button is clicked', () => {
        cy.get('.ant-btn').click()
        cy.get('.ant-modal-title').should('be.visible')
        cy.get('.ant-modal-close').click()

    })
    it('should display all the contents of the modal', () => {
        cy.get('.ant-btn').click()
        cy.get('.ant-modal-title')
        cy.get('[title="Name"]')
        cy.get('[title="Email"]')
        cy.get('.ant-modal-close').click()
    })
    it('should input the correct value', () => {
        cy.get('.ant-btn').click()
        cy.get('#control-hooks_Name').type('testName')
        cy.get('#control-hooks_Email').type('testEmail')
        cy.get('.ant-modal-close').click()
    })
    it('should display error if the form is empty', () => {
        cy.get('.ant-btn').click()
        cy.get('#control-hooks_Name')
        cy.get('#control-hooks_Email')
        cy.get('.ant-btn.ant-btn-primary[type="Submit"]').click()
        cy.get('.ant-form-item-explain-error').should('have.length', 2)
    })
    it('should reset the form content on click', () => {
        cy.get('.ant-btn').click()
        cy.get('#control-hooks_Name').type('testName')
        cy.get('#control-hooks_Email').type('testEmail')
        cy.get('.ant-btn-default').click()
        cy.get('#control-hooks_Name').should('have.value', "")
        cy.get('#control-hooks_Email').should('have.value', "")
    })
    it('submites userData', () => {
        cy.get('.ant-btn').click()
        const rand = Math.floor(Math.random() * 100)
        cy.get('#control-hooks_Name').type('ttestName')
        cy.get('#control-hooks_Email').type(`${rand}ttestEmail@gmail.com`)

        cy.get('form').submit()
        cy.intercept('POST', 'localhost:1337/api/interns', (res) => {
            res.reply((res) => {
                res.send({
                    data: {
                        username: 'ttestName',
                        email: 'ttestEmail@gmail.com',
                        id: rand
                    }
                })
            })
        })
    })
}
);