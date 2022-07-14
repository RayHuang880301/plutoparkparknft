import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FrontCover from '../components/frontCover/FrontCover'
import React, { RefObject, useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';

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
    </Head>
    <section className="nft-section">
      <div ref={nftDom} className="nft-container" style={{height: dimensions.height}}>
        <FrontCover></FrontCover>
      </div>
    </section>
    </>
  )
}

export default Home
