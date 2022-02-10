import React, { FC, useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import regl, { ReglFrame } from "react-regl";
import { mat4, vec4 } from "gl-matrix";
import { gsap } from "gsap";
// import { PixiScatterplot } from "./PixiScatterplot";
const PixiScatterplot = dynamic(
  () => import("./PixiScatterplot"),
  { ssr: false }
)

import * as d3 from "d3";
import { loadDataFromCsv, usePrevious } from "../../hooks/customHooks";

let dataUrl =
  "https://raw.githubusercontent.com/ryezzz/visualization-sketches/main/src/data/rye4_word_analysis.csv";

interface TitleProps {
  title: string;
  subtitle: string;
}

export const PixiScatterplotContainer: FC<TitleProps> = ({
  title,
  subtitle,
}) => {
  let targetRef = useRef<HTMLCanvasElement>(null);
  let containerRef = useRef<HTMLDivElement>(null);
  let data = loadDataFromCsv(dataUrl);
  const [currentDate, setCurrentDate] = useState("");
  const prevDate = usePrevious(currentDate, "year");


  let dementions = {
    height: 500,
    width: 500,
    marginleft: 20,
    padding: 1,
  };



  useEffect(() => {
    setCurrentDate("year")
    },[])




  let buttonNames = ["week", "month", "year"];

  const Button = (buttonName: string, setFunction: Function) => {
    function onClick(e: { target: { value: any } }) {
      setFunction(e.target.value);
    }
    return (
      <button key={Math.random()} value={buttonName} onClick={onClick as any}>
        {buttonName}
      </button>
    );
  };

  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <div id={"#tooltipDivLight"}></div>
      {data.length > 0 ? (

        <div
          ref={containerRef}
          style={{ border: "solid 2px white", width: " 100%", height: "70vh" }}
        >

          {buttonNames.map((buttonName) => Button(buttonName, setCurrentDate))}

          <PixiScatterplot
            data={data as any}
            dementions={dementions}
            targetref={targetRef}
            background={"white"}
            selecteddate={currentDate}
            previousdate={prevDate}
            selectedvalue={"entry_word_count"}
            linewidth={2}
            circlecolor="blue"
            containeref={containerRef}
            useEffect={useEffect}
            useState={useState}
            useRef={useRef}
            React={React}
            gsap={gsap}
          ></PixiScatterplot>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
