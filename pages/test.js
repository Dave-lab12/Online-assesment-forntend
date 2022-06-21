import axios from 'axios'
import { useState, useEffect } from 'react'
const Test = () => {
    const [userData, setUserData] = useState({})
    const [counter, setCounter] = useState(0)
    const [begin, setBegin] = useState(false)
    const [question, setQuestion] = useState({})
    const [answer, setAnswer] = useState({})
    const BASE_URL = 'http://localhost:1337/api'
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        if (counter <= 0) {
            try {
                const sendUser = await axios.post(BASE_URL + '/interns', { data: userData })
                setUserData({ ...userData, id: sendUser.data.data.id })
            } catch (error) {
                console.log(error)
            } finally {
                return setCounter((counter) => counter + 1)
            }
        }
        try {
            const sendAnswer = await axios.post(`${BASE_URL}/answers`, { data: { ...answer, intern: userData.id } })

            console.log({ data: { Answer: 'answer.Answer', data: { Intern: { data: { id: userData.id } } } } })
        } catch (error) {

        }
    }
    useEffect(() => {
        if (counter > 0) {
            getQuestion(counter)
        }
    }, [counter])

    const getQuestion = async (number) => {
        try {
            const resQuestion = await axios.get(`${BASE_URL}/questions/${number}`)
            setQuestion(resQuestion.data)
            setBegin(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {
                !begin ? (
                    <>
                        <label>Candidates Name</label>
                        <input type="text" onChange={(e) => handleChange(e)} name="Name" />
                        <label>Candidates Email</label>
                        <input type="text" onChange={(e) => handleChange(e)} name="Email" />
                    </>) :
                    question && (
                        <>
                            <h1>{question?.data?.attributes?.Title}</h1>
                            <input type='text' onChange={e => setAnswer({ Answer: e.target.value, question: question.data.id })} />
                        </>
                    )

            }

            <button onClick={handleSubmit}>Next</button>
        </div >
    )
}
export default Test


// http://localhost:1337/api/interns?populate[answers][populate]=question