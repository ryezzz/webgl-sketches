import React, { FC, useRef, useState, useEffect } from "react";
import regl, { ReglFrame } from "react-regl";
import { mat4, vec4 } from "gl-matrix";
import { NetworkRegl } from "./networkRegl";
import { loadDataFromJson, loadDataFromTSV } from "../../hooks/customHooks";
import nodes from "../../../data/social_network_data";
// import { json } from 'stream/consumers';

let dementions = {
  height: 1000,
  width: 1000,
};

interface TitleProps {
  title: string;
  subtitle: string;
}

export const NetworkReglContainer: FC<TitleProps> = ({ title, subtitle }) => {
  let containerRef = useRef<HTMLDivElement>(null);

  const data = nodes;

  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      {JSON.stringify(data)}
      <div style={{ width: 1002, height: 500 }} ref={containerRef}>
        {" "}
        <NetworkRegl
          dementions={dementions}
          containerRef={containerRef}
          background={"white"}
          data={data as any}
        ></NetworkRegl>
      </div>
    </>
  );
};
