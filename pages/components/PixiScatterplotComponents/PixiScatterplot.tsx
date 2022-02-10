import { Application } from "pixi.js";
import {FC } from "react";
import * as PIXI from "pixi.js";
import { dodge } from "../../utils/utils";
import dynamic from 'next/dynamic';
import { scaleDiverging, scaleLinear, scaleSequential, extent, axisBottom } from "d3";
import { Delaunay } from "d3-delaunay";
import { roughGenerator } from "./pixiRough";

export const PixiScatterplot: FC<ScatterProps> = ({
  useEffect,
  targetref,
  React,
  useState,
  useRef,
  dementions,
  background,
  data,
  selecteddate,
  selectedvalue,
  linewidth,
  circlecolor,
  previousdate,
  containeref,
  gsap
}) => {
  let pixiCanvasElement = useRef<HTMLDivElement>(null);
  let animationDuration = 2;
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [graficFun, setGraphicFun] = useState(new PIXI.Graphics());
  const [particleFun, setParticleFun] = useState(new PIXI.Container());
  const xAxisScale = scaleSequential()
    .domain(extent(data, (d) => d[selecteddate]) as any)
    .range([dementions.marginleft, width - dementions.marginRight]);

  const xAxis =
    axisBottom(xAxisScale as any)
    .ticks(5)
    .tickFormat((d) => `${d}`);

  const rScale = scaleLinear()
    .domain(extent(data, (d) => d[selectedvalue as string]) as any)
    .range([1, height / 78]);

  const r = (selection: any) => rScale(selection);

  const preRenderedCircles = data.map((d: any) => ({
    circle: roughGenerator.circle(0, 0, r(d[selectedvalue] * 2), {
      roughness: .8,
      strokeWidth: .1,
    }),
    id: d.id
  }));


  const xScale = (_: object, prevOrCurrent: string) =>
   scaleSequential()
      .domain(extent(data, (d) => d[prevOrCurrent]) as any)
      .range([dementions.marginleft + dementions.marginleft, width]);

  const dodgedParticlesOrigin = dodge(
    data,
    previousdate,
    selectedvalue,
    xScale(data, previousdate),
    r,
    dementions.padding
  ) as any;

  console.log(selecteddate, dodgedParticlesOrigin)

  const dodgedParticlesDestination = dodge(
    data,
    selecteddate,
    selectedvalue,
    xScale(data, selecteddate),
    r,
    dementions.padding
  ) as any;


  const [pixiApp, setPixiapp] = useState();
  // console.log("SEKECTEDDATE", selecteddate);

  useEffect(() => {
    setWidth(containeref.current.clientWidth);
    setHeight(containeref.current.clientHeight);

    const app = new Application({
      width: width,
      height: height,
      backgroundColor: 0xffffff,
      resolution: 4,
      autoDensity: true,
    });
// const app = ClientRenderedApp(width, height, 0xffffff, 4, true)
    //Remove the previously created render on each render of new canvas
    let childCanvasToRemove = pixiCanvasElement.current?.childNodes[0];
    let childType = typeof childCanvasToRemove;
    childType != "undefined" &&
      pixiCanvasElement.current?.removeChild(childCanvasToRemove);

    //Append final canvas after initial loads
    pixiCanvasElement.current?.appendChild(app.view);
    app.start();
    setPixiapp(app);
    setGraphicFun(new PIXI.Graphics());
    setParticleFun(new PIXI.Container());
  }, [width, height]);



  useEffect(() => {
    pixiApp?.start();

    const update = () => {
      // new PIXI.Graphics()

      const animation = () =>
        gsap.fromTo(
          dodgedParticlesOrigin,
          {
            x: (index) => dodgedParticlesOrigin[index].x,
            y: (index) => dodgedParticlesOrigin[index].y,
            immediateRender: true,
          },
          {
            x: (index) => dodgedParticlesDestination[index].x,
            y: (index) => dodgedParticlesDestination[index].y,
            ease: "power.3.out",
            duration: .5,
            onUpdate: animate,
            immediateRender: true,

            onInterrupt: animate,
            stagger: {
              each: 0.001,
              from: "random",
            },
          }
        );

      animation();



      function animate() {
        graficFun.clear(),
        graficFun.lineStyle(1, 0xe78be7, 1);

        dodgedParticlesOrigin.map((d: any) => {
          let id = d.data.id
          let roughCircleFilter = preRenderedCircles.filter(item => item.id === id)
          let roughCircle = roughCircleFilter[0].circle

          function yAdjust(val){
           return height - val
          }



          roughCircle.sets.forEach((step) => {
            if (step.type === "path") {
              step.ops.forEach(({ op, data }) => {
                const [cp1x, cp1y, cp2x, cp2y, x, y] = data;
                switch (op) {
                  case "bcurveTo":
                    particleFun.addChild(graficFun.bezierCurveTo(cp1x + d.x,  yAdjust(cp1y + d.y), cp2x+ d.x, yAdjust(cp2y+ d.y), x+ d.x, yAdjust(y+ d.y)));
                    break;
                  case "lineTo":
                    particleFun.addChild( graficFun.lineTo(cp1x + d.x, yAdjust(cp1y+ d.y)));
                    break;
                  case "move":
                    particleFun.addChild( graficFun.moveTo(cp1x+ d.x, yAdjust(cp1y+ d.y)));
                    break;
                  default:
                    break;
                }
              });
            }
          });

          pixiApp?.stage?.addChild(particleFun);

        });
      }
    };
    update();
    return () => {
      pixiApp?.stop();
    };
  }, [width, height, selecteddate, previousdate, graficFun]);

  // console.log(firstUpdate);
  return (
    <div>
      <>
        <div
          style={{ float: "left" }}
          className="pixicanvas"
          width={width}
          height={height}
          ref={pixiCanvasElement}
        ></div>
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

