import React, { FC } from 'react';
import regl, { ReglFrame } from 'react-regl';
import { mat4, vec4 } from 'gl-matrix';
import {Triangle, PentaGram, DrawParticles} from './Shapes'



interface TitleProps {
  title: string;
  subtitle: string;
}

export const ReglContainer: FC<TitleProps> = ({ title, subtitle }) => {

  const backgroundColor: vec4 = [0.40625, 0.94921, 0.996, 0];

  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <ReglFrame color={backgroundColor}>
      <Triangle color={[0, 0, 0, 1]} />
      </ReglFrame>
      <ReglFrame
      color={backgroundColor}
      onFrame={(context, regl) => regl.clear({color: backgroundColor})}
    >
      <PentaGram />
    </ReglFrame>
    <ReglFrame
      onFrame={(context, regl) => regl.clear({
        color: [0,0,0,0],
        depth:1
      })}>
      <DrawParticles />
    </ReglFrame>

    </>
  );
};



