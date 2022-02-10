import { Application } from "pixi.js";
import React, { useEffect, FC, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { render, Text } from "@inlet/react-pixi";
import * as regl from "regl";

interface Props {
  dementions: {};
  background: string;
  containerRef: any;
  data:[any]
}
//   let containerRef = useRef<HTMLDivElement>(null);

export const NetworkRegl: FC<Props> = ({
  dementions,
  background,
  containerRef,
  data
}) => {
  const targetRef = useRef<HTMLCanvasElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  useEffect(() => {
    setWidth(containerRef?.current?.clientWidth);
    setHeight(containerRef?.current?.clientHeight);
    console.log(data,width, dementions, background);



  }, [width, height, data.length]);

  return (
    <>
      <canvas ref={targetRef}></canvas>
      <canvas ref={canvasElement}></canvas>
    </>
  );
};
