import { useState } from 'react'
import '../styles/globals.css'
import { UserDataContext } from '../context/userContext'
function MyApp({ Component, pageProps }) {


  const [userData, setUserData] = useState({});
  const [questionsLength, setQuestionsLength] = useState(0);


  return <UserDataContext.Provider value={{
    userData, setUserData, questionsLength,
    setQuestionsLength
  }}>
    <Component {...pageProps} />
  </UserDataContext.Provider>
}

export default MyApp
