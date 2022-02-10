import { Application } from "pixi.js";
import React, { useEffect, FC, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { render, Text } from "@inlet/react-pixi";
import * as regl from "regl";
import * as d3 from "d3";

interface Props {
  dementions: {};
  background: string;
  containerRef: any;
  data: { nodes: [any]; links: [any] };
}
//   let containerRef = useRef<HTMLDivElement>(null);

export const NetworkRegl: FC<Props> = ({
  dementions,
  background,
  containerRef,
  data,
}) => {
  const targetRef = useRef<HTMLCanvasElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    setWidth(containerRef?.current?.clientWidth);
    setHeight(containerRef?.current?.clientHeight);
    console.log(data, width, dementions, background);

    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d:any) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const context = canvasElement?.current?.getContext("2d");
    console.log(context);
    simulation.on("tick", ticked);

    function ticked() {
      if (context != null) {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        links.forEach(drawLink);
        context.strokeStyle = "#aaa";
        context.stroke();
        context.strokeStyle = "#fff";
        for (const node of nodes) {
          context.beginPath();
          drawNode(node);
          context.fillStyle = "black";
          context.fill();
          context.stroke();
        }
      }
    }

    function drawLink(d: any) {
      if (context != null) {
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
      }
    }

    function drawNode(d: any) {
      if (context != null) {
        context.moveTo(d.x + 3, d.y);
        context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
      }
    }
  }, [width, height, data]);

  return (
    <>
      <canvas width={width} height={height} ref={canvasElement}></canvas>
    </>
  );
};
