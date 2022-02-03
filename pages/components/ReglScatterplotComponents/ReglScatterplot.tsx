import { FC, useEffect } from "react";
import createScatterplot from "regl-scatterplot";


interface canvasProperties {
  canvaselem: any;
}

 const ReglScatterplot: FC<canvasProperties> = ({ canvaselem }) => {
    useEffect(() => {
    if (Object.keys(canvaselem).length != 0) {
      console.log(canvaselem);
      let scatterplot = createScatterplot({
        canvas: canvaselem.current,
        width: window.innerWidth,
        height: window.innerHeight,
      });

    scatterplot.set({ backgroundColor: "#00ff00" }); // hex string
    scatterplot.set({ backgroundColor: [255, 0, 0] }); // rgb array
    scatterplot.set({ backgroundColor: [255, 0, 0, 1.0] }); // rgba array
    scatterplot.set({ backgroundColor: [1.0, 0, 0, 1.0] }); // normalized rgba

    // Color by
    scatterplot.set({ colorBy: "category" });

    // Set color map
    scatterplot.set({
      pointColor: ["#ff0000", "#00ff00", "#0000ff"],
      // pointColorActive: ["#ff0000", "#00ff00", "#0000ff"], // optional
      // pointColorHover: ["#ff0000", "#00ff00", "#0000ff"] // optional
    });

    // Set base opacity
    scatterplot.set({ opacity: 2});

    // Set the width of the outline of selected points
    scatterplot.set({ pointOutlineWidth: 2 });

    // Set the base point size

    // Set the additional point size of selected points
    scatterplot.set({ pointSizeSelected: 2 });

    // Activate recticle and set recticle color to red
    // scatterplot.set({ showRecticle: true, recticleColor: [1, 0, 0, 0.66] });
    scatterplot.draw([
      [.2, -0.1, 0, 3],
      [0.8, -0.1, 9, 2],
      [0.3, 0.1, 0,1],
      [-0.9, 0.8, 0, 1]
    ]);
    scatterplot.set({   sizeBy: 'valueA'  });

    }

  }, [canvaselem]);


  return (null)
};

export default ReglScatterplot
