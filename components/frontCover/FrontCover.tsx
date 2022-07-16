import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './FrontCover.module.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import LuckyCard from '../luckyCard/LuckyCard'
import dcLogo from '../../assets/dcLogo.png'
import LoadingCard from '../loadingCard/LoadingCard'
import PlayCard from '../playCard/PlayCard'
import ResultCard from '../resultCard/ResultCard'
import ImageFortune1 from '../../assets/study.png';
import ImageFortune2 from '../../assets/work.png';
import ImageFortune3 from '../../assets/love.png';
import ImageFortune4 from '../../assets/health.png';
import ImageFortuneNft1 from '../../assets/nft_study.png';
import ImageFortuneNft2 from '../../assets/nft_work.png';
import ImageFortuneNft3 from '../../assets/nft_love.png';
import ImageFortuneNft4 from '../../assets/nft_health.png';
import ImageFeeling1 from '../../assets/sleep.png';
import ImageFeeling2 from '../../assets/hot.png';
import ImageFeeling3 from '../../assets/drink.png';
import ImageFeeling4 from '../../assets/comfort.png';
import ImageFeeling5 from '../../assets/big.png';
import keyboard1 from '../../assets/keyboard1.png'
import keyboard2 from '../../assets/keyboard2.png'
import keyboard3 from '../../assets/keyboard3.png'
import keyboard4 from '../../assets/keyboard4.png'
import Link from 'next/link'
import dcQrCode from '../../assets/dcQrCode.png'

const FAKE_LOADING_TIME = 5 * 1000;
const SPECIAL_TIME = 14.6 * 1000;

export enum FortuneType {
  None,
  Study,
  Work,
  Love,
  Health
}

export enum FeelingType {
  None,
  Sleep,
  Hot,
  Drink,
  Comfortable,
  Big,
}

const enum LuckyType {
  Unknown = '',
  Good = '大吉',
  Well = '小吉',
  Normal = '平籤',
  Bad = '凶'
}
const LuckyList = [LuckyType.Good, LuckyType.Normal, LuckyType.Bad];


const TicketInfo: any = {
  [LuckyType.Unknown]: {},
  [LuckyType.Good]: {
    [FortuneType.Study]: '有料，沒準備還拿高分考倒數最後一名！',
    [FortuneType.Work]: '直接走到飛，歐印賭身家後晉升少年董！',
    [FortuneType.Love]: '加賴叫過去，愛愛世大運，冥王星的海王就是你了！',
    [FortuneType.Health]: '極限體能王484啊，怎麼搞都不會倒誒？',
  },
  [LuckyType.Well]: {
    [FortuneType.Study]: '會寫的都寫對不會寫都猜對，考前記得先大便',
    [FortuneType.Work]: '川頁一波，穩健成長，長大當個大潤發',
    [FortuneType.Love]: '曖昧的小店開成分公司，Lover就在你眼前！',
    [FortuneType.Health]: '小子不錯啊...金槍不倒天天趴踢',
  },
  [LuckyType.Normal]: {
    [FortuneType.Study]: '不會寫的一律選Ｃ，不然怎麼辦？',
    [FortuneType.Work]: '別人小賺你暴富，別人小虧你破產，當心就好',
    [FortuneType.Love]: '我們的速配指數有幾趴？好好經營，來者可追！',
    [FortuneType.Health]: '你知道去哪找我，這是一張健康籤！Pluto提醒你注意平安！',
  },
  [LuckyType.Bad]: {
    [FortuneType.Study]: '出包了啦，完美避開正確答案，Pluto之神提醒你記得讀書',
    [FortuneType.Work]: '塊陶...被割爛後麥當勞報到，快加入Pluto化解！',
    [FortuneType.Love]: '聽完這首歌你就會放下他了⋯⋯嗎？沒事啦，下個會更好。',
    [FortuneType.Health]: '沒保險就少出門多戴口罩，不然自摸二條的就是你！',
  }
}

const FortuneList = [
    {
      title: '學業運',
      subtitle: '你最近似乎有「學業」的壓力...',
      type: FortuneType.Study,
      audioPath: '/audio/melody1.mp3',
      audio: new Audio('/audio/melody1.mp3'),
      image: ImageFortune1.src,
      backgroundColor: '#F1CD4B',
  }, {
      title: '事業運',
      subtitle: '你最近特別心煩「事業」瓶頸...',
      type: FortuneType.Work,
      audioPath: '/audio/melody2.mp3',
      audio: new Audio('/audio/melody2.mp3'),
      image: ImageFortune2.src,
      backgroundColor: '#F1CD4B',
  }, {
      title: '戀愛運',
      subtitle: '你最近可能有「暈船」的困擾...',
      type: FortuneType.Love,
      audioPath: '/audio/melody3.mp3',
      audio: new Audio('/audio/melody3.mp3'),
      image: ImageFortune3.src,
      backgroundColor: '#F1CD4B',
  }, {
      title: '健康運',
      subtitle: '你最近有點在意身心「健康」...',
      type: FortuneType.Health,
      audioPath: '/audio/melody4.mp3',
      audio: new Audio('/audio/melody4.mp3'),
      image: ImageFortune4.src,
      backgroundColor: '#F1CD4B',
  }
]
const FeelingList = [
  {
    title: '想睡',
    type: FeelingType.Sleep,
    audioPath: '/audio/drum1.mp3',
    audio: new Audio('/audio/drum1.mp3'),
    image: ImageFeeling1.src,
    backgroundColor: '#D9D9D9',
}, {
    title: '好熱',
    type: FeelingType.Hot,
    audioPath: '/audio/drum2.mp3',
    audio: new Audio('/audio/drum2.mp3'),
    image: ImageFeeling2.src,
    backgroundColor: '#D9D9D9',
}, {
    title: '宿醉',
    type: FeelingType.Drink,
    audioPath: '/audio/drum3.mp3',
    audio: new Audio('/audio/drum3.mp3'),
    image: ImageFeeling3.src,
    backgroundColor: '#D9D9D9',
}, {
    title: '舒服',
    type: FeelingType.Comfortable,
    audioPath: '/audio/drum4.mp3',
    audio: new Audio('/audio/drum4.mp3'),
    image: ImageFeeling4.src,
    backgroundColor: '#D9D9D9',
}, {
    title: '法大',
    type: FeelingType.Big,
    audioPath: '/audio/drum5.mp3',
    audio: new Audio('/audio/drum5.mp3'),
    image: ImageFeeling5.src,
    backgroundColor: '#D9D9D9',
}
]

export default function FrontCover() {
  const [luckyType, setLuckyType] = useState<LuckyType>(LuckyType.Unknown);
  const setRandomLucky = () => {
    const random = Math.floor(Math.random() * LuckyList.length);
    setLuckyType(LuckyList[random]);
  }
  const [fortuneType, setFortuneType] = useState<FortuneType>(FortuneType.None);
  const [isFortuneSubmit, setIsFortuneSubmit] = useState(false);
  const [feelingType, setFeelingType] = useState<FeelingType>(FeelingType.None);
  const [isFeelingSubmit, setIsFeelingSubmit] = useState(false);
  const [keyboardImg, setKeyboardImg] = useState<string>(keyboard1.src);
  const [isJoin, setIsJoin] = useState(false);
  const [isQrCode, setIsQrCode] = useState(false);

  const subImage = useCallback(() => {
    const item = FortuneList.find(item => item.type === fortuneType);
    if(item) {
      switch (item.type) {
        case FortuneType.Study:
          return ImageFortuneNft1.src;
        case FortuneType.Work:
          return ImageFortuneNft2.src;
        case FortuneType.Love:
          return ImageFortuneNft3.src;
        case FortuneType.Health:
          return ImageFortuneNft4.src;
        default:
          return '';
      }
      return '';
    }
    return '';
  }, [fortuneType])

  const eyeImage = useCallback(() => {
    const item = FeelingList.find(item => item.type === feelingType);
    return item ? item.image : '';
  }, [feelingType])

  const [loadingState, setLoadingState] = useState<{
    isLoaded: boolean,
    timeoutId: number
  }>({
    isLoaded: false,
    timeoutId: 0
  });
  const [specialComfirmState, setSpecialComfirmState] = useState<{
    isComfirm: boolean,
    timeoutId: number
  }>({
    isComfirm: false,
    timeoutId: 0
  });


  useEffect(() => {
    if(!isFortuneSubmit || !isFeelingSubmit) {
      return;
    }
    if(specialComfirmState.timeoutId) {
      clearTimeout(specialComfirmState.timeoutId);
    }
    const timeoutId = setTimeout(() => {
      setSpecialComfirmState({
        isComfirm: true,
        timeoutId: 0,
      })
    }, SPECIAL_TIME);
    setSpecialComfirmState({
      isComfirm: false,
      timeoutId: Number(timeoutId),
    })
    playSpecialMode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFortuneSubmit, isFeelingSubmit])
  useEffect(() => {
    if(!isFortuneSubmit || !isFeelingSubmit || !specialComfirmState.isComfirm) {
      return;
    }
    if(loadingState.timeoutId) {
      clearTimeout(loadingState.timeoutId);
    }
    const timeoutId = setTimeout(() => {
      setLoadingState({
        isLoaded: true,
        timeoutId: 0,
      })
      setKeyboardImg(keyboard4.src)
      playSpecialMode(true);
    }, FAKE_LOADING_TIME);
    setLoadingState({
      isLoaded: false,
      timeoutId: Number(timeoutId),
    })
    setRandomLucky();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFortuneSubmit, isFeelingSubmit, specialComfirmState])

  const chooseFortune = useCallback((fortune: FortuneType) => {
    if(isFortuneSubmit) {
      return;
    }
    if(fortuneType !== fortune) {
      setFortuneType(fortune);
    } else {
      setIsFortuneSubmit(true);
      setKeyboardImg(keyboard2.src)
    }
  }, [fortuneType, isFortuneSubmit])

  const chooseFeeling = useCallback((feeling: FeelingType) => {
    if(isFeelingSubmit) {
      return;
    }
    if(feelingType !== feeling) {
      setFeelingType(feeling);
    } else {
      setIsFeelingSubmit(true);
      setKeyboardImg(keyboard3.src)
    }
  }, [feelingType, isFeelingSubmit])

  const isFortuneActive = (fortune: FortuneType) => {
    return !isFortuneSubmit && fortune === fortuneType;
  }

  const isFeelingActive = (feeling: FeelingType) => {
    return !isFeelingSubmit && feeling === feelingType;
  }

  const playSpecialMode = useCallback((isLoop = false) => {
    const fortune = FortuneList.find(item => item.type === fortuneType);
    const feeling = FeelingList.find(item => item.type === feelingType);
    if(fortune && feeling) {
      fortune.audio.loop = isLoop;
      fortune.audio.play();
      feeling.audio.loop = isLoop;
      feeling.audio.play();
    }
  }, [feelingType, fortuneType]);

  const getFeelingSubTitle = useCallback(() => {
    const fortune = FortuneList.find(item => item.type === fortuneType);
    return fortune?.subtitle;
  }, [fortuneType])
  
  return (
    <div className={styles.section}>
      {/* <Header /> */}
      <div className={styles.container}>
        {/* <PlutoEffect></PlutoEffect> */}
        {!isQrCode &&
        (
          <>
            <div className={styles.dc} onClick = {() => setIsQrCode(true)}><Image src={dcLogo.src} width={35} height={35} alt='' />&nbsp;Pluto Lab</div>
            <div className={styles.word}>
              加入Pluto Lab<br />
              免費領取算命NFT！
            </div>
          </>
        )}
        {isQrCode && !isJoin &&
        (
          <>
            <div className={styles.qrCode}><Image src={dcQrCode.src} width={250} height={250} alt='' /></div>
            <div className={styles.join} onClick = {() => setIsJoin(true)}>
              <div className={styles.joinImg}><Image src={dcLogo.src} width={25} height={25} alt='' layout="responsive"/></div>
              &nbsp;已加入
            </div>
          </>
        )}
        {
          isJoin && !isFortuneSubmit &&
          (
            <>
            <div className={`${styles.cards} ${styles.cardsFortune}`}>

              {FortuneList.map((item, idx) =>  {
                
                return <LuckyCard onClick={(event) => chooseFortune(item.type)} isFortuneSubmit={isFortuneSubmit} isPlay={isFortuneActive(item.type)} audioPath={item.audioPath} key={idx} img={item.image} backgroundColor={isFortuneActive(item.type) ? '#FB8111' : item.backgroundColor}>{item.title}</LuckyCard>

              } )}


            </div>
            <div className={styles.title}>今天，我想來點...</div>
            </>
          )
        }
        {
          (isJoin && isFortuneSubmit && !isFeelingSubmit &&
          <div className={styles.cards}>
            {FeelingList.map((item, idx) =>  <LuckyCard onClick={(event) => chooseFeeling(item.type)} size={true} isFortuneSubmit={isFortuneSubmit} isPlay={isFeelingActive(item.type)} audioPath={item.audioPath} key={idx} img={item.image} backgroundColor={isFeelingActive(item.type) ? '#939393' : item.backgroundColor} subImage={subImage()}>{item.title}</LuckyCard> )}
            <div className={styles.title}>{getFeelingSubTitle()}</div>

          </div> ) || ''
        }
        {
          (isJoin && !specialComfirmState.isComfirm && isFortuneSubmit && isFeelingSubmit && 
          <PlayCard fortuneType={fortuneType} image={eyeImage()} subImage={subImage()}></PlayCard>) || ''
        }
        {
          (isJoin && !loadingState.isLoaded && specialComfirmState.isComfirm  && isFortuneSubmit && isFeelingSubmit && 
          <LoadingCard />) || ''
        }
        {
          (
            isJoin && loadingState.isLoaded && specialComfirmState.isComfirm  && isFortuneSubmit && isFeelingSubmit && 
            <ResultCard result={luckyType} word={TicketInfo[luckyType][fortuneType]} image={eyeImage()} subImage={subImage()}/>
          ) || ''
                  

        }
      </div>
      <Footer>{keyboardImg}</Footer>
    </div>
  )
}
