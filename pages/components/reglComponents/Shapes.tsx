import React, { FC } from 'react';
import regl, { ReglFrame } from 'react-regl';
import { mat4, vec4 } from 'gl-matrix';
// TODO - Figure out why this library is reading as invalid
// @ts-ignore
import hsv2rgb from 'hsv2rgb';



interface TriangleProps {
  color: any;
}


// I want to try this: https://observablehq.com/@emamd/animating-lots-and-lots-of-circles-with-regl-js

export const Triangle = regl({
  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.

  vert: `
          precision mediump float;
          attribute vec2 position;
          void main () {
            gl_Position = vec4(position, 0, 2);
          }`,

  frag:`
          precision mediump float;
          uniform vec4 color;
          void main () {
            gl_FragColor = color;
          }`,

  // Here we define the vertex attributes for the above shader
  attributes:{
    position: [
      [-1, 0],
      [0, -1],
      [1, 1]
    ]
    // regl automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms:{
    // This defines a dynamic regl value that can bethat can be passed as a react prop
    color: regl.prop('color'),
    backgroundColor: regl.prop('backgroundColor')

  },

  // This tells regl the number of vertices to draw in this command
  count: 3
})


export const PentaGram = regl({
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  attributes: {
    position: (new Array(5)).fill(0).map((x, i) => {
      var theta = 2.0 * Math.PI * i / 5
      return [ Math.sin(theta), Math.cos(theta) ]
    })
  },

  uniforms: {
    color: [1, 0, 0, 1]
  },

  elements: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 40],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4]
  ],

  lineWidth: () => {
    var lineWidth = 3
    if (lineWidth > regl.limits.lineWidthDims[1]) {
      lineWidth = regl.limits.lineWidthDims[1]
    }

    return lineWidth
  }
});


const NUM_POINTS = 1e4
const VERT_SIZE = 4 * (4 + 3 + 3)
// const VERT_SIZE = 10
const dataArray = [100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0,100, 2, 50, 1, 0]
// const dataArray = [0,0,0,0]
console.log(Array(NUM_POINTS).fill(0))

console.log(dataArray)

const dataArrayMap = dataArray.map(()=>{
  const color = hsv2rgb(Math.random() * 360, 0.6, 1)
  return [
    // freq
    Math.random() * 20,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    // phase
    2.0 * Math.PI * Math.random(),
    2.0 * Math.PI * Math.random(),
    2.0 * Math.PI * Math.random(),
    2.0 * Math.PI * Math.random(),
    // color
    color[0] / 255, color[1] / 255, color[2] / 255
  ]
})

// TODO - Figure out how to assign a type to a paramater that's a function
// @ts-ignore
export const pointBuffer = regl.buffer(dataArrayMap)

export const DrawParticles = regl({
  vert: `
  precision mediump float;
  attribute vec4 freq, phase;
  attribute vec3 color;
  uniform float time;
  uniform mat4 view, projection;
  varying vec3 fragColor;
  void main() {
    vec3 position = 8.0 * cos(freq.xyz * time + phase.xyz);
    gl_PointSize = 5.0 * (1.0 + cos(freq.w * time + phase.w));
    gl_Position = projection * view * vec4(position, 1);
    fragColor = color;
  }`,

  frag: `
  precision lowp float;
  varying vec3 fragColor;
  void main() {
    if (length(gl_PointCoord.xy - 0.5) > 0.5) {
      discard;
    }
    gl_FragColor = vec4(fragColor, 1);
  }`,

  attributes: {
    freq: {
      buffer: pointBuffer,
      stride: VERT_SIZE,
      offset: 0
    },
    phase: {
      buffer: pointBuffer,
      stride: VERT_SIZE,
      offset: 16
    },
    color: {
      buffer: pointBuffer,
      stride: VERT_SIZE,
      offset: 32
    }
  },

  uniforms: {
    view: ({tick}) => {
      const t = 0.0001 * tick

      return mat4.lookAt(
        mat4.create(),
        [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
        [0, 0, 0],
        [0, 1, 0]
      )
    },
    projection: ({viewportWidth, viewportHeight}) =>
      mat4.perspective(
        mat4.create(),
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        1000
      ),
    time: ({tick}) => tick * 0.001
  },

  count: dataArray.length,

  primitive: 'points'
})
