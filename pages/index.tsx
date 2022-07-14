import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FrontCover from '../components/frontCover/FrontCover'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>PlutoLab</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PlutoLab" />
      <meta property="og:image" content=""></meta>
      <meta property="og:description" content="With the theme of interactive music NFT, Pluto Lab is committed to developing a community of music lovers in the web3 and NFT world."></meta>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;800&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;400;600;900&display=swap" rel="stylesheet"></link>
    </Head>
    <FrontCover />
    </>
  )
}

export default Home
