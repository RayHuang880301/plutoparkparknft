import React from 'react'
import styles from './ResultCard.module.css'
import Image from 'next/image';
import ImageTicket from '../../assets/ticket.png';

interface Props {
  result: string;
  word: string;
  image: string;
  subImage: string;
}

export default function ResultCard(props: Props) {
  const { result, word, subImage, image } = props;

  return (
    <div className={styles.container}>
       <div className={styles.bg}>
        <div className={styles.boxImage} style={{backgroundColor: '#F1CD4B', }}>
        {
          (
            subImage &&
            <div className={styles.subBoxImage}>
              <Image src={subImage} width={180} height={180} alt='' layout='responsive'/>
            </div>
          ) || ''
        }
        <Image src={image} width={180} height={180} alt='' layout='responsive'/>
        </div>
        <div className={styles.content}>
          <h2 className={styles.result}>{result}</h2>
          <div className={styles.word}>{word}</div>
        </div>
      </div>
    </div>
  )
}
