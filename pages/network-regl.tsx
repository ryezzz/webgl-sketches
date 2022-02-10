import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { NetworkReglContainer } from "./components/networkRegl";

const NetworkRegl: NextPage = () => {
  return (
    <div className={styles.container}>
      <NetworkReglContainer
        title="Network with d3/webgl"
        subtitle="Starting with simple canvas and then moving to webgl"
      />
    </div>
  );
};

export default NetworkRegl;
