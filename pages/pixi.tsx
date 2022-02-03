import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {PixiScatterplotContainer} from './components/PixiScatterplotComponents'

const PixiScatterplot: NextPage = () => {
  return (
    <div className={styles.container}>
<PixiScatterplotContainer title="Pixi Scatterplot" subtitle='Looking for the quickest path to visualizing with webgl'/>
    </div>
  )
}

export default PixiScatterplot
