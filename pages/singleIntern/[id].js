import { useRouter } from 'next/router'
import axios from 'axios'
import nookies from "nookies";

import { BASE_URL } from '../../Api'
import { useState, useEffect } from 'react'
import { Table, Statistic, Card, Spin, PageHeader } from 'antd'
const SingleIntern = () => {
    const [singleIntern, setSingleIntern] = useState({})
    const [correctAns, setCorrectAns] = useState(null)
    const [loading, setLoading] = useState(true)
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
            title: 'Copied title',
            dataIndex: 'copiedTitle',
        },
        {
            title: 'Pasted answer',
            dataIndex: 'pastedAnswer',
        },
        {
            title: 'Count Swithed tabs',
            dataIndex: 'countSwitchedTabs',
        },
        {
            title: 'correct',
            dataIndex: 'correct',
        },
    ];
    const data = [];
    const filterCorrectAns = (questionID) => {
        let answer
        correctAns && correctAns.map((item, index) => {
            if (item.id === questionID) {
                answer = item?.attributes?.question_answer?.data?.attributes?.answer
            }
        })
        return answer
    }
    singleIntern.data && singleIntern.data.attributes.answers.data.map((item, index) => {
        const questionId = item.attributes.question.data.id
        const question = item.attributes.question.data.attributes.Title
        const answer = item.attributes.Answer
        const copiedTitle = item.attributes.copiedTitle
        const pastedAnswer = item.attributes.pastedAnswer
        const countSwitchedTabs = item.attributes.countSwitchedTabs
        const correctAnswer = filterCorrectAns(questionId)
        const correct = answer === correctAnswer ? 'true' : 'false'
        data.push({
            key: index,
            questionId,
            question,
            answer,
            correctAnswer,
            correct,
            copiedTitle: copiedTitle.toString(),
            pastedAnswer: pastedAnswer.toString(),
            countSwitchedTabs
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
        setLoading(false)
    }
    const countCorrectValues = () => {
        let count = 0
        data.map((item, index) => {
            if (item.correct === 'true') {
                count++
            }
        })

        return count;
    }
    return <>
        <Spin tip="Loading..." spinning={loading}>
            <PageHeader
                className="site-page-header"
                onBack={() => router.back()}
                title="Home"
                extra={[
                    <Card style={{ width: 300, float: 'right', margin: '20px' }} hoverable>
                        <Statistic title="Answered" value={countCorrectValues()} suffix={`/ ${data.length}`} />
                    </Card>
                ]}
            />
            <Table columns={columns} dataSource={data} />
        </Spin>
    </>
}
export const getServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx);
    let user = null;

    if (cookies?.jwt) {
        try {
            const { data } = await axios.get(BASE_URL + "/users/me", {
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                },
            });
            user = data;
        } catch (e) {
            console.log(e);
        }
    }

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return {
        props: {
            user,
        },
    };
};
export default SingleIntern
//url to get interns id answer and quesrion
//http://localhost:1337/api/interns/156?populate[answers][populate]=question

//url to get Question-answers with question
//http://localhost:1337/api/questions?populate=question_answer

//http://localhost:1337/api/question-answers?populate=*