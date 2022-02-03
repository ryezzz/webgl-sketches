import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ReglScatterplotContainer} from './components/ReglScatterplotComponents'

const ReglScatterplot: NextPage = () => {
  return (
    <div className={styles.container}>
<ReglScatterplotContainer title="ReglFirst Scatterplot Library" subtitle='Looking for the quickest path to visualizing with webgl'/>
    </div>
  )
}

export default ReglScatterplot
