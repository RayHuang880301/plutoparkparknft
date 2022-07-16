import React, { MouseEventHandler, useEffect, useRef } from 'react'
import styles from './LuckyCard.module.css'
import Image from 'next/image'
import pImg from '../../assets/pImgWt.svg'

interface Props {
  img: string;
  children: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  audioPath: string;
  isPlay: boolean;
  backgroundColor: string;
  subImage?: string;
  size?: boolean
  isFortuneSubmit?: boolean;
}

export default function LuckyCard(props: Props) {
  const { isFortuneSubmit, img, children, onClick, audioPath, isPlay, backgroundColor, subImage, size } = props;
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(audioPath) : undefined
  );
  useEffect(() => {
    if(musicPlayers.current) {
      musicPlayers.current.loop = true;
    }
  }, [])

  // const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    const player = musicPlayers.current;
    if(!player) {
      return;
    }
    if(isPlay) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      player.pause();
    }
  }, [isPlay])


  return (
    <div onClick={onClick} className={`${size ? styles.box2 : styles.box1 } ${isPlay ? styles.boxActive : ''}`}>
      <div className={styles.boxImage} style={{backgroundColor, }}>
        {
          (
            subImage &&
            <div className={styles.subBoxImage}>
              <Image src={subImage} width={200} height={200} alt='' layout='responsive'/>
            </div>
          ) || ''
        }
        {isFortuneSubmit && <Image src={img} width={200} height={200} alt='' layout='responsive'/>}
        {!isFortuneSubmit && <div className={styles.logo}><Image src={pImg} width={60} height={60} alt='' layout='fixed'/></div>}
      </div>
      {/* <div className={styles.choice}>{children}</div> */}
    </div>
  )
}

