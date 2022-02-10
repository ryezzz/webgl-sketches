import React, { FC, useRef, useState, useEffect } from "react";
import regl, { ReglFrame } from "react-regl";
import { mat4, vec4 } from "gl-matrix";
import { NetworkRegl } from "./networkRegl";
import { loadDataFromJson, loadDataFromTSV } from "../../hooks/customHooks";
import nodes from "../../../data/social_network_data";

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
      <div
        aria-label={`Network graph showing relatiohsips between ${data?.nodes?.length} characters in Les Miserables`}
        style={{ width: "100%", height: "50vh" }}
        ref={containerRef}
      >
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
