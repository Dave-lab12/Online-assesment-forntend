import { useRouter } from 'next/router'
import axios from 'axios'
import { BASE_URL } from '../../Api'
import { useState, useEffect } from 'react'
import { Table } from 'antd'
const SingleIntern = () => {
    const [singleIntern, setSingleIntern] = useState({})
    const [correctAns, setCorrectAns] = useState(null)
    const answerLength = singleIntern?.data?.attributes?.answers?.data?.length
    const router = useRouter()
    const { id } = router.query
    const columns = [
        {
            title: 'question ID',
            dataIndex: 'questionId',
        },
        {
            title: 'question title',
            dataIndex: 'question',
            width: "30%",
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
        },
        {
            title: 'correct answer',
            dataIndex: 'correctAnswer',
        },
        {
            title: 'correct',
            dataIndex: 'correct',
        },
    ];
    const data = [];
    const filterCorrectAns = (questionID) => {
        return correctAns && correctAns.map((item, index) => {
            if (item.id === questionID) {
                return item.attributes.question_answer.data.attributes.answer
            }
        })
    }
    singleIntern.data && singleIntern.data.attributes.answers.data.map((item, index) => {
        const questionId = item.attributes.question.data.id
        const question = item.attributes.question.data.attributes.Title
        const answer = item.attributes.Answer
        const correctAnswer = filterCorrectAns(questionId)
        console.log(filterCorrectAns(questionId));
        const correct = answer === correctAnswer ? 'true' : 'false'
        data.push({
            key: index,
            questionId,
            question,
            answer,
            correctAnswer,
            correct,
        })
    })


    useEffect(() => {
        if (id) {
            getSingleIntern()
            getCorrectAns()
        }
    }, [id])
    const getCorrectAns = async () => {
        const correctAns = await axios.get(`${BASE_URL}/questions?populate=question_answer`)
        setCorrectAns(correctAns.data.data)
    }


    const getSingleIntern = async () => {
        const res = await axios.get(`${BASE_URL}/interns/${id}?populate[answers][populate]=question
        `)
        setSingleIntern(res.data)
    }

    // console.log(singleIntern);
    return <>
        <p>SingleIntern: {id}</p>
        <Table columns={columns} dataSource={data} />
    </>
}

export default SingleIntern
//url to get interns id answer and quesrion
//http://localhost:1337/api/interns/156?populate[answers][populate]=question

//url to get Question-answers with question
//http://localhost:1337/api/questions?populate=question_answer
//http://localhost:1337/api/question-answers?populate=*