import React, { FC } from 'react';
import regl, { ReglFrame } from 'react-regl';
import { mat4, vec4 } from 'gl-matrix';
import {ReglScatterplot} from './ReglScatterplot'



interface TitleProps {
  title: string;
  subtitle: string;
}

export const ReglScatterplotContainer: FC<TitleProps> = ({ title, subtitle }) => {

  const backgroundColor: vec4 = [0.40625, 0.94921, 0.996, 0];

  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <ReglScatterplot></ReglScatterplot>
    </>

  );
};



