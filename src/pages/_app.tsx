import {AppProps} from 'next/app'
import '../styles/global.scss'
import { Header } from '../components/Header'
import {Provider as NextAuthProvider} from 'next-auth/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const initialOptions = {
  'client-id' : 'AQZ5VHXyjnqz9JlPwrTU28fFXO0enmL8HXqvApfccqCGZZaji1n092QwQhxzBGn7Lq4udkzVMjf-jGpB',
  'currency' : 'BRL',
  'intent': 'capture'
}


function MyApp({ Component, pageProps } : AppProps) {
  return(
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header/>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
 