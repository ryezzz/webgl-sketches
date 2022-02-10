import { Application } from "pixi.js";

function ClientRenderedApp (width, height, background, resolution, autoDensity) { return new Application({
  width: width,
  height: height,
  backgroundColor: background,
  resolution: resolution,
  autoDensity: autoDensity,
})};

export default ClientRenderedApp
