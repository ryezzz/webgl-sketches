// declare module 'roughjs/bundled/rough.esm'


import rough from 'roughjs/bundled/rough.esm';

import RoughType from 'roughjs';

declare type RoughGenerator = ReturnType<typeof RoughType.generator>;

const generator = rough.generator(undefined);
const roughGeneratorInstance = generator as RoughGenerator;

export const roughGenerator = roughGeneratorInstance;


// const rectangle = roughGenerator.rectangle(0, 0, 100, 100);
// rectangle.sets.forEach(step => {
//     if (step.type === 'path') {
//         step.ops.forEach(({op, data}) => {

//             const [cp1x, cp1y, cp2x, cp2y, x, y] = data;
//             switch (op) {
//                 case "bcurveTo":
//                     buttonDraw.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
//                     break;
//                 case "lineTo":
//                     buttonDraw.lineTo(cp1x, cp1y)
//                     break;
//                 case "move":
//                     buttonDraw.moveTo(cp1x, cp1y)
//                     break;
//                 default:
//                     break;
//             }
//         })
//     }
// });
