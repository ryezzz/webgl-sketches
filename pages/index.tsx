import type { NextPage } from "next";
import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface CardProps {
  href: string;
  title: string;
  subtitle: string;
}

const Card: FC<CardProps> = ({ href, title, subtitle }) => {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </a>
    </Link>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>WebGL Experiments</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>WebGL Data Vis Sketches</h1>
        <p className={styles.description}></p>
        <div className={styles.grid}>
          <Card
            href="./regl-scatterplot"
            title="Regl Scatterplot"
            subtitle="experimentation"
          ></Card>
          <Card
            href="./regl"
            title="Regl React"
            subtitle="basic examples"
          ></Card>
          <Card
            href="./pixi"
            title="Pixi Journal"
            subtitle="experimentation"
          ></Card>
          <Card
            href="./mapboxgl"
            title="Mapbox gl"
            subtitle="experimentation"
          ></Card>
          <Card
            href="./threejs"
            title="Three js"
            subtitle="experimentation"
          ></Card>
          <Card
            href="./visx"
            title="Visx"
            subtitle="This isn't webgl :)"
          ></Card>
          <Card
            href="./network-regl"
            title="Network Webgl"
            subtitle="Network with canvas then webgl"
          ></Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
