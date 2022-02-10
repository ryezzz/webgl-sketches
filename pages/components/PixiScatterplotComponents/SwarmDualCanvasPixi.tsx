import { Application } from "pixi.js";
import React, { useEffect, FC, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { dodge } from "../../utils/utils";
import * as d3 from "d3";
import { gsap } from "gsap";
import { Delaunay } from "d3-delaunay";
import { roughGenerator } from "./pixiRough";

console.log("ROUGH GENERATIOR", roughGenerator.circle(10, 100, 59))

export const PixiScatterplot: FC<ScatterProps> = ({
  targetref,
  dementions,
  background,
  data,
  selecteddate,
  selectedvalue,
  linewidth,
  circlecolor,
  previousdate,
  containeref,
}) => {
  let canvasElement = useRef<HTMLCanvasElement>(null);
  let pixiCanvasElement = useRef<HTMLDivElement>(null);
  let animationDuration = .5;

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const xAxisScale = d3
    .scaleSequential()
    .domain(d3.extent(data, (d) => d[selecteddate]) as any)
    .range([dementions.marginleft, width - dementions.marginRight]);

  const xAxis = d3
    .axisBottom(xAxisScale as any)
    .ticks(5)
    .tickFormat((d) => `${d}`);

  const rScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[selectedvalue as string]) as any)
    .range([1, height / 78]);

  const xScale = (_: object, prevOrCurrent: string) =>
    d3
      .scaleSequential()
      .domain(d3.extent(data, (d) => d[prevOrCurrent]) as any)
      .range([dementions.marginleft + dementions.marginleft, width]);

  const r = (selection: any) => rScale(selection);

  const dodgedParticlesOrigin = dodge(
    data,
    previousdate,
    selectedvalue,
    xScale(data, previousdate),
    r,
    dementions.padding
  ) as any;

  const dodgedParticlesDestination = dodge(
    data,
    selecteddate,
    selectedvalue,
    xScale(data, selecteddate),
    r,
    dementions.padding
  ) as any;

  const [pixiApp, setPixiapp] = useState();

  useEffect(() => {
    const app = new Application({
      width: width,
      height: height,
      backgroundColor: 0x2c3e50,
      resolution: 2,
      autoDensity: true,
    });

    //Remove the previously created render on each render of new canvas
    let childCanvasToUpdate = pixiCanvasElement.current?.childNodes[1];
    let childCanvasToRemove = pixiCanvasElement.current?.childNodes[1];

    let childType = typeof childCanvasToRemove;

    childType != "undefined" &&
      pixiCanvasElement.current?.removeChild(childCanvasToRemove);

    pixiCanvasElement.current?.appendChild(app.view);
    app.start();

    setPixiapp(app);
  }, [width]);

  const gr = new PIXI.Graphics();



  useEffect(() => {
    gr.clear();
    const update = () => {
      const animation = () =>
        gsap.fromTo(
          dodgedParticlesOrigin,
          {
            x: (index) => dodgedParticlesOrigin[index].x,
            y: (index) => dodgedParticlesOrigin[index].y,
          },
          {
            x: (index) => dodgedParticlesDestination[index].x,
            y: (index) => dodgedParticlesDestination[index].y,
            ease: "power.10.out",
            duration: animationDuration,
            onUpdate: animate,
            stagger: {
              each: 0.001,
              from: "random",
            },
          }
        );

      animation();

      function animate() {
        gr.clear(), gr.lineStyle(1, 0xe78be7, 1);

       dodgedParticlesOrigin.map(
          (d: any) => {
            let roughCircle = roughGenerator.circle(d.x - dementions.marginleft, height - d.y, d.r);

            roughCircle.sets.forEach(step => {
              if (step.type === 'path') {
                  step.ops.forEach(({op, data}) => {

                      const [cp1x, cp1y, cp2x, cp2y, x, y] = data;
                      switch (op) {
                          case "bcurveTo":
                              gr.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                              break;
                          case "lineTo":
                              gr.lineTo(cp1x, cp1y)
                              break;
                          case "move":
                              gr.moveTo(cp1x, cp1y)
                              break;
                          default:
                              break;
                      }
                  })
              }
          });


            // gr.drawCircle(d.x - dementions.marginleft, height - d.y, d.r);
            pixiApp?.stage?.addChild(gr);
          }
        );
      }
    };

    update();

    return () => {
      // On unload stop the application
      gr.clear();
    };
  }, [width, selecteddate, gr, gr.clear()]);

  useEffect(() => {
    setWidth(containeref.current.clientWidth / 2.1);
    setHeight(containeref.current.clientHeight);

    const canvas = canvasElement.current;
    const context = canvas!.getContext("2d", { alpha: true });
    context!.lineWidth = linewidth;
    context!.fillStyle = background;
    context!.strokeStyle = circlecolor;

    const update = () => {
      const animation = () =>
        gsap.fromTo(
          dodgedParticlesOrigin,
          {
            x: (index) => dodgedParticlesOrigin[index].x,
            y: (index) => dodgedParticlesOrigin[index].y,
          },
          {
            x: (index) => dodgedParticlesDestination[index].x,
            y: (index) => dodgedParticlesDestination[index].y,
            ease: "power.3.out",
            duration: animationDuration,
            // Documentation: https://greensock.com/docs/v3/Staggers
            onUpdate: gr.clear() && animate,
            onInterrupt: gr.clear(),
            lazy: true,
            stagger: {
              each: 0.001,
              from: "random",
            },
          }
        );

      animation();

     async function animate() {
        context!.clearRect(0, 0, width, height);

        // d3.select(ax.current).call(xAxis);
        dodgedParticlesOrigin.map(
          (d: any) => (
            // console.log(d.x, dementions.marginleft),
            context!.beginPath(),
            context!.arc(
              d.x - dementions.marginleft,
              height - d.y,
              d.r,
              0,
              2 * Math.PI
            ),
            context!.stroke(),
            context!.fill()
          )
        );
      }
    };

    window.onresize = function () {
      setWidth(containeref.current.clientWidth);
      setHeight(containeref.current.clientHeight);
    };

    update();
  }, [selecteddate, width]);

  return (

    <div>
      <>
        <div style={{ float: "left" }}>
          <div style={{ width: "100%" }}>Canvas</div>
          <canvas width={width} height={height} ref={canvasElement}></canvas>
        </div>
        <div
          style={{ float: "left" }}
          className="pixicanvas"
          width={width}
          height={height}
          ref={pixiCanvasElement}
        >
          <div style={{ width: "100%" }}>Pixi</div>
        </div>
      </>

    </div>
  );
};

interface ScatterProps {
  targetref: any;
  dementions: any;
  background: string;
  selecteddate: string;
  selectedvalue: string;
  data: [any];
  linewidth: number;
  circlecolor: string;
  previousdate: string;
  containeref: any;
}

export default PixiScatterplot;

// const delaunayPoints = (dateString: string, x:number, y:number) =>
// Delaunay.from(dodgedParticlesDestination.map((d:any) => [d.x, d.y]));

// const tooltip = isBrowser() && d3.select("#tooltipDivLight").style("opacity", 0) as any;

// function showTooltip(
//   tooltipX: number,
//   tooltipY: number,
//   readableValue: string,
//   readableDate: string,
//   readableFullDate: string
// ) {
//   isBrowser() &&
//     tooltip
//       .style("opacity", 1)
//       .style("display", "block")
//       .style("top", tooltipY + "px")
//       .style("left", tooltipX + 30 - dementions.marginleft + "px")
//       .style("z-index", 5000000)
//       .html(
//         `<div class ="swarmTooltipText">
//           <div>words written: <b>${readableValue}</b></div>
//           <div>${selecteddate}: <b>${readableDate}</b></div>
//           <div><b>${readableFullDate}</b></div>
//           </div>`
//       );
// }
