import axios from "axios";
import { setCookie } from 'nookies'

export default async (req, res) => {
    const { email, password } = req.body

    try {
        const postRes = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: email, password
        })

        setCookie({ res }, 'jwt', postRes.data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            // secure: false,
            maxAge: 30 * 24 * 60 * 60,
            // sameSite: "none",
            path: '/',
        });

        res.status(200).end();
    } catch (err) {
        res.status(400).send(err.response)
    }
}