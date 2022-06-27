import '../styles/globals.css'
import { createContext } from 'react'
const Context = createContext({})
function MyApp({ Component, pageProps }) {
  return <Context.Provider value={Context}>
    <Component {...pageProps} />
  </Context.Provider>
}

export default MyApp
