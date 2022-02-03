import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ReglContainer} from './components/reglComponents'

console.log(ReglContainer)
const Regl: NextPage = () => {
  return (
    <div className={styles.container}>
<ReglContainer title="ReglFirst Attempt" subtitle='Connecting an existing example'/>
    </div>
  )
}

export default Regl
