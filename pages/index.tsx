import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import FrontCover from '../components/frontCover/FrontCover'
import React, { RefObject, useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/frontCover/FrontCover'), {
  ssr: false
})

function useRefDimensions(ref: RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 })
  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current) {
        const { current } = ref
        const boundingRect = current.getBoundingClientRect()
        const { width, height } = boundingRect
        setDimensions({ width: Math.round(width), height: Math.round(width) })
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [ref]);
  return dimensions;
}


const Home: NextPage = () => {
  const nftDom = useRef<HTMLDivElement>(null);
  const dimensions = useRefDimensions(nftDom)
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
    <section className="nft-section">
      <div ref={nftDom} className="nft-container" style={{height: dimensions.height}}>
        <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR>
      </div>
    </section>
    </>
  )
}

export default Home
