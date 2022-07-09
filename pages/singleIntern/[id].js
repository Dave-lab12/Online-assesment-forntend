import { useRouter } from 'next/router'
import axios from 'axios'
import { BASE_URL } from '../../Api'
import { useState, useEffect } from 'react'
const SingleIntern = () => {
    const [singleIntern, setSingleIntern] = useState({})
    const router = useRouter()
    const { id } = router.query
    const getSingleIntern = async () => {
        const res = await axios.get(`${BASE_URL}/interns/${id}`)
        setSingleIntern(res.data)
    }
    useEffect(() => {
        getSingleIntern()
    }, [])
    console.log(singleIntern);
    return <p>SingleIntern: {id}</p>
}

export default SingleIntern
