import type { AppProps } from 'next/app'
import '../styles/globals.scss';
import '../styles/effect.scss';
import '../styles/nft.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
