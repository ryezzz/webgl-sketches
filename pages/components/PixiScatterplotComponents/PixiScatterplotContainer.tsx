import React, { FC, useRef, useState, useEffect } from "react";
import regl, { ReglFrame } from "react-regl";
import { mat4, vec4 } from "gl-matrix";
import { PixiScatterplot } from "./PixiScatterplot";
import * as d3 from "d3"
import {loadData} from "../../hooks/customHooks"

let dementions = {
  height: 1000,
  width: 1000,
};

interface TitleProps {
  title: string;
  subtitle: string;
}

export const PixiScatterplotContainer: FC<TitleProps> = ({
  title,
  subtitle,
}) => {
  let targetRef = useRef<HTMLCanvasElement>(null);
  let canvasElement = useRef<HTMLCanvasElement>(null);

  console.log(loadData("https://raw.githubusercontent.com/ryezzz/visualization-sketches/main/src/data/rye4_word_analysis.csv"))
  // useEffect(() => {
  //   // if (initialCanvasRef.current && initialCanvasRef.current != null) {
  //     setTargetRef(initialCanvasRef);
  //   // }

  // }, [initialCanvasRef]);

  // useRef<HTMLCanvasElement>(null)

  return (
    <>
      <button>week</button>
      <button>year</button>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <canvas ref={targetRef}></canvas>
      <canvas ref={canvasElement}></canvas>

      <PixiScatterplot
        dementions={dementions}
        canvaselement={canvasElement}
        targetref={targetRef}
        background={"white"}
      ></PixiScatterplot>
    </>
  );
};
