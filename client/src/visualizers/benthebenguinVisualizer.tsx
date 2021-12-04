// 3rd party library imports
import { NotSentFilled16 } from '@carbon/icons-react';
import P5 from 'p5';
import * as Tone from 'tone';
import { StereoFeedbackEffect } from 'tone/build/esm/effect/StereoFeedbackEffect';

// project imports
import { Visualizer } from '../Visualizers';

// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

export const benthebenguinVisualizer = new Visualizer(
  'benthebenguin',
  (p5: P5, analyzer: Tone.Analyser) => {

    // const num_circles: number = 2;
    // const height: number = window.innerHeight;
    // const width: number = window.innerWidth;
    // const dim = Math.min(width, height);
    // const center_x: number = width/2;
    // const center_y: number = height/2;

    // var rows: number;
    // var cols: number;
    // var current: number[][];
    // var previous: number[][];

    // var dampening: number = 0.99;

    // p5.setup = () => {
    //   p5.createCanvas(width, height);
    //   p5.pixelDensity(1);
    //   rows = height;
    //   cols = width;

    //   // initialize current and previous 2d arrays to 0
    //   for(var i = 0; i < rows; i++) {
    //     for(var j = 0; j < cols; j++) {
    //       current[i][j] = 0;
    //       previous[i][j] = 0;
    //     }
    //   }
    // }

    // p5.draw = () => {
    //   p5.background(0, 0, 0, 255);
    //   p5.loadPixels();
    //   for (var i = 1; i < cols - 1; i++) {
    //     for (var j = 1; j < rows - 1; j++) {
    //       current[i][j] =
    //         (previous[i - 1][j] +
    //           previous[i + 1][j] +
    //           previous[i][j - 1] +
    //           previous[i][j + 1]) / 2 - current[i][j];

    //       current[i][j] = current[i][j] * dampening;
    //       let index = (i + j * cols) * 4;
    //       p5.pixels[index + 0] = current[i][j];
    //       p5.pixels[index + 1] = current[i][j];
    //       p5.pixels[index + 2] = current[i][j];
    //     }
    //   }
    //   p5.updatePixels();

    //   let temp = previous;
    //   previous = current;
    //   current = temp;



    //   const values = analyzer.getValue();
    //   for(var i = 0; i < values.length; i++) {

    //   }
    // }
  },
)
