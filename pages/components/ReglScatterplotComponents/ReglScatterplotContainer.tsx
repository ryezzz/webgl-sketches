import React, { FC, useRef, useState, useEffect } from "react";

// https://stackoverflow.com/questions/65612851/imported-modules-without-server-side-rendering-feature
// import { renderCanvasFunction } from "./ReglScatterplot";

import dynamic from 'next/dynamic';

//Had to do a dynamic import because the regl scatterplot library (which loads before the app loads) uses document which won't be found on first render.
const ReglScatterplot = dynamic(
  () => import("./ReglScatterplot"),
  { ssr: false }
)

interface TitleProps {
  title: string;
  subtitle: string;
}

// @ts-ignore
// TODO - Fix the type is false warning
export const ReglScatterplotContainer: FC<TitleProps> = ({
  title,
  subtitle
}) => {
  const reglScatterplotRef = useRef<HTMLCanvasElement>(null);
  const [rglScatterplotCanvas, setRglScatterplotCanvas] = useState({});

  useEffect(() => {
    if (reglScatterplotRef.current && reglScatterplotRef.current != null) {
      setRglScatterplotCanvas(reglScatterplotRef);
    }



  }, [rglScatterplotCanvas]);


  return (
    typeof window !== 'undefined' && (<>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        id="canvas"
        ref={reglScatterplotRef}

      ></canvas>
      <ReglScatterplot canvaselem={rglScatterplotCanvas}></ReglScatterplot>

    </>)
  );
};

