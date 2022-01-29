import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ReglContainer} from './components/reglComponents'

const Regl: NextPage = () => {
  return (
    <div className={styles.container}>
<ReglContainer></ReglContainer>
    </div>
  )
}

export default Regl
