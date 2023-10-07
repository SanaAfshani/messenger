import React  from 'react'
import styles from './backToBottomButton.module.scss'

const BackToBottomButton = ({onClick}) => {

  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <svg
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M17.71,12.71a1,1,0,0,0-1.42,0L13,16V6a1,1,0,0,0-2,0V16L7.71,12.71a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.3,4.29A2,2,0,0,0,12,19h0a2,2,0,0,0,1.4-.59l4.3-4.29A1,1,0,0,0,17.71,12.71Z"/>
      </svg>
    </div>
  )
}

export default BackToBottomButton
