import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {GlobalContextProvider} from '../context/GlobalContext'
import  { AuthContextProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
