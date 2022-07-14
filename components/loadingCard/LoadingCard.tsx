import React from 'react'
import styles from './LoadingCard.module.css'

export default function LoadingCard() {
  return (
    <div className={styles.loadingBox}>
      <div className={styles.bar}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.word}>求神問卜中...</div>
    </div>
  )
}
