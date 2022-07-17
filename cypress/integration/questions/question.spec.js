
describe('Question', () => {
    beforeEach(() => {
        // cy.visit('/question');
    })
    it('should display question title', () => {
        cy.get('h1').should('have.length', 2)
    })
    it("should display question title and content with a mock", () => {
        cy.intercept('GET', 'localhost:1337/api/questions?populate[QuestionType][populate]=isMultiple', {
            fixture: "questionList.json"
        })

        cy.contains('Inside which HTML element do we put the JavaScript?')

        cy.get('.ant-btn.ant-btn-primary.ant-btn-lg').click()

        cy.intercept('POST', 'localhost:1337/api/answers', (res) => {
            res.reply((res) => {
                res.sednd({
                    data: {
                        Answer: answer,
                        question: rand,
                        intern: rand,
                        countSwitchedTabs: rand,
                        copiedTitle: false,
                        pastedAnswer: false,
                    }
                })
            })
        })


        cy.contains('What is the correct JavaScript syntax to change the content of the HTML')


    })
})

