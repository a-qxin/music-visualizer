// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const TonyT415Visualizer = new Visualizer(
  'TonyT415',
  (p5: P5, analyzer: Tone.Analyser) => {
    //these values are for findin size of the availible window
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    //thickness of lines
    p5.strokeWeight(dim * 0.01);

    //this is the color of the line/shape
    p5.stroke(255, 0, 255, 255);
    //if noFill(), then it wont "fill in the space between the middle and the lines"
    p5.fill(0, 0, 255, 255);

    const values = analyzer.getValue();
    //parameter of begin shape affects the contents of the lines
    // p5.beginShape();
    // for (let i = 0; i < values.length; i++) {
    //   const amplitude = values[i] as number;
    //   const x = p5.map(i, 0, values.length - 1, 0, width);
    //   const y = height / 2 + amplitude * height;
    //   // Place vertex
    //   p5.vertex(x, y);
    // }
    // p5.endShape();
    for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        const y = 0 + 4 * (amplitude * height);
        //const y = height / 2 + amplitude * height;
        // Place vertex
        p5.ellipse(x-700,height/2-150,1,y/2);
      }
  },
);