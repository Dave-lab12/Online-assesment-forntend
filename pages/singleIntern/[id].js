import { useRouter } from 'next/router'
import axios from 'axios'
import { BASE_URL } from '../../Api'
import { useState, useEffect } from 'react'
const SingleIntern = () => {
    const [singleIntern, setSingleIntern] = useState({})
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            getSingleIntern()
        }
    }, [id])
    const getSingleIntern = async () => {

        const res = await axios.get(`${BASE_URL}/interns/${id}?populate[answers][populate]=question
        `)
        setSingleIntern(res.data)
    }

    console.log(singleIntern);
    return <p>SingleIntern: {id}</p>
}

export default SingleIntern
//url to get interns id answer and quesrion
//http://localhost:1337/api/interns/156?populate[answers][populate]=question

//url to get Question-answers with question

//http://localhost:1337/api/question-answers?populate=*