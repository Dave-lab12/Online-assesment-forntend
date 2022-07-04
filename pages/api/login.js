import axios from "axios";
import { setCookie, SetCookie } from 'nookies'

export default async (req, res) => {
    const { password, email } = req.body
    console.log(password, email);
    try {
        const postRes = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: email, password
        })

        setCookie({ res }, 'jwt', postRes.data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });

        res.status(200).end()
    } catch (err) {
        res.status(400).send(err.response)
    }
}