import { useState } from 'react'
import '../styles/globals.css'
import { UserDataContext } from '../context/userContext'
function MyApp({ Component, pageProps }) {


  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState({});


  return <UserDataContext.Provider value={{
    userData, setUserData, questions,
    setQuestions
  }}>
    <Component {...pageProps} />
  </UserDataContext.Provider>
}

export default MyApp
