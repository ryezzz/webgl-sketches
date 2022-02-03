import { Application } from "pixi.js";
import React, { useEffect, FC } from "react";
import * as PIXI from "pixi.js";
import { render, Text } from '@inlet/react-pixi';
import * as regl from "regl"



interface ScatterProps {
  targetref:{}
  dementions:{}
  background:string
  canvaselement:{}
}

export const PixiScatterplot: FC<ScatterProps> = ({
  targetref,
  dementions,
  background,
  canvaselement
}) => {
  useEffect(() => {

    console.log(targetref, canvaselement, dementions, background)

  }, []);

  return (<></>)
};
