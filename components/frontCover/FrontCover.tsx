import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './FrontCover.module.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import LuckyCard from '../luckyCard/LuckyCard'
import logo from '../../assets/logo.png'
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
  Normal = '平籤',
  Bad = '大凶'
}
const LuckyList = [LuckyType.Good, LuckyType.Normal, LuckyType.Bad];


const TicketInfo: any = {
  [LuckyType.Unknown]: {},
  [LuckyType.Good]: {
      [FortuneType.Study]: '讀書不會打瞌睡，只看一次全都會，考試會寫的都正確，有不會的都猜對。',
      [FortuneType.Work]: '升職加薪好運到，願你幸福快樂開口笑，出門見喜祥雲繞，成功記得分我錢。',
      [FortuneType.Love]: '將迎來命定人，並深情相愛，一生一世不分離，好扯。',
      [FortuneType.Health]: '身體非常硬朗，防疫險賺不到錢，健保費送給政府，辛苦了'
  },
  [LuckyType.Normal]: {
      [FortuneType.Study]: '維持目前的步調吧，可能進步可能退步，神明也幫不上忙',
      [FortuneType.Work]: '春天的事業是溫暖的，夏天的事業是芬芳的，秋天的事業是沉甸甸的，冬天的事業是平靜的，其實也不知道這代表啥意思',
      [FortuneType.Love]: '有愛人請繼續愛他/她，有喜歡的人就去追求，不然人生好無聊',
      [FortuneType.Health]: '謹言慎行，不要以為自己不會確診，有保險才可以確診'
  },
  [LuckyType.Bad]: {
      [FortuneType.Study]: '讀書一定打瞌睡，看了N次都不會，考試會寫的都...喔沒有會寫的',
      [FortuneType.Work]: '錢少事多離家遠，做什麼事都不對，總覺得自己很衰，哭哭',
      [FortuneType.Love]: '遇到好人不是真的好，另一半會讓你心煩；若是單身今年想脫單，不可能。吧',
      [FortuneType.Health]: '來park park可能喝醉，回家路上小心安全！'
  }
}

const FortuneList = [
    {
        title: '學業運',
        type: FortuneType.Study,
        audioPath: '/audio/melody1.mp3',
        image: ImageFortune1.src,
        backgroundColor: '#F1CD4B',
    }, {
        title: '事業運',
        type: FortuneType.Work,
        audioPath: '/audio/melody2.mp3',
        image: ImageFortune2.src,
        backgroundColor: '#F1CD4B',
    }, {
        title: '戀愛運',
        type: FortuneType.Love,
        audioPath: '/audio/melody3.mp3',
        image: ImageFortune3.src,
        backgroundColor: '#F1CD4B',
    }, {
        title: '健康運',
        type: FortuneType.Health,
        audioPath: '/audio/melody4.mp3',
        image: ImageFortune4.src,
        backgroundColor: '#F1CD4B',
    }
]
const FeelingList = [
    {
        title: '想睡',
        type: FeelingType.Sleep,
        audioPath: '/audio/drum1.mp3',
        image: ImageFeeling1.src,
        backgroundColor: '#D9D9D9',
    }, {
        title: '好熱',
        type: FeelingType.Hot,
        audioPath: '/audio/drum2.mp3',
        image: ImageFeeling2.src,
        backgroundColor: '#D9D9D9',
    }, {
        title: '宿醉',
        type: FeelingType.Drink,
        audioPath: '/audio/drum3.mp3',
        image: ImageFeeling3.src,
        backgroundColor: '#D9D9D9',
    }, {
        title: '舒服',
        type: FeelingType.Comfortable,
        audioPath: '/audio/drum4.mp3',
        image: ImageFeeling4.src,
        backgroundColor: '#D9D9D9',
    }, {
        title: '法大',
        type: FeelingType.Big,
        audioPath: '/audio/drum5.mp3',
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
    console.log('SPECIAL')
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

  const playSpecialMode = () => {
    const fortune = FortuneList.find(item => item.type === fortuneType);
    const feeling = FeelingList.find(item => item.type === feelingType);
    const audio1 = new Audio(fortune?.audioPath);
    const audio2 = new Audio(feeling?.audioPath);
    audio1.play();
    audio2.play();
  }

  

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if(event.key) {
        switch (event.key) {
          case 'a':
          case 'A':
            location.reload();
            break;
          case 'q':
          case 'Q':
            chooseFortune(FortuneType.Study);     
            break;
          case 'w':
          case 'W':
            chooseFortune(FortuneType.Work);     
            break;
          case 'e':
          case 'E':
            chooseFortune(FortuneType.Love);     
            break;
          case 'r':
          case 'R':
            chooseFortune(FortuneType.Health);     
            break;
          case 'd':
          case 'D':
            chooseFeeling(FeelingType.Sleep);     
            break;
          case 'f':
          case 'F':
            chooseFeeling(FeelingType.Hot);     
            break;
          case 'g':
          case 'G':
            chooseFeeling(FeelingType.Drink);     
            break;
          case 'h':
          case 'H':
            chooseFeeling(FeelingType.Comfortable);     
            break;
          case 'j':
          case 'J':
            chooseFeeling(FeelingType.Big);     
            break;
          default:
            break;
        }
      }
    }
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    }
  }, [chooseFeeling, chooseFortune, isFeelingSubmit, isFortuneSubmit, fortuneType, feelingType])

  return (
    <div className={styles.section}>
      {/* <Header /> */}
      <div className={styles.container}>
        {/* <PlutoEffect></PlutoEffect> */}
        {
          !isFortuneSubmit &&
          (
            <>
            <div className={styles.cards}>
              {FortuneList.map((item, idx) =>  <LuckyCard onClick={(event) => chooseFortune(item.type)} isPlay={isFortuneActive(item.type)} audioPath={item.audioPath} key={idx} img={item.image} backgroundColor={isFortuneActive(item.type) ? '#FB8111' : item.backgroundColor}>{item.title}</LuckyCard> )}
            </div>
            <div className={styles.title}>今天，我想來點...</div>
            </>
          )
        }
        {
          (isFortuneSubmit && !isFeelingSubmit &&
          <div className={styles.cards}>
            {FeelingList.map((item, idx) =>  <LuckyCard size={true} onClick={(event) => chooseFeeling(item.type)} isPlay={isFeelingActive(item.type)} audioPath={item.audioPath} key={idx} img={item.image} backgroundColor={isFeelingActive(item.type) ? '#939393' : item.backgroundColor} subImage={subImage()}>{item.title}</LuckyCard> )}
          </div> ) || ''
        }
        {
          (!specialComfirmState.isComfirm && isFortuneSubmit && isFeelingSubmit && 
          <PlayCard fortuneType={fortuneType} image={eyeImage()} subImage={subImage()}></PlayCard>) || ''
        }
        {
          (!loadingState.isLoaded && specialComfirmState.isComfirm  && isFortuneSubmit && isFeelingSubmit && 
          <LoadingCard />) || ''
        }
        {
          (
            loadingState.isLoaded && specialComfirmState.isComfirm  && isFortuneSubmit && isFeelingSubmit && 
            <ResultCard result={luckyType} word={TicketInfo[luckyType][fortuneType]} image={eyeImage()} subImage={subImage()}/>
          ) || ''
                  

        }
      </div>
      <Footer>{keyboardImg}</Footer>
    </div>
  )
}
