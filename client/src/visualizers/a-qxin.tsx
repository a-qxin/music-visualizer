// perlin noise ref: https://p5js.org/examples/math-noise-wave.html

// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// 2nd dimension for visualizer
let yoff = 0.0;

export const aqxinVisualizer = new Visualizer(
  'aqxin',
  (p5: P5, analyzer: Tone.Analyser) => {
    const height = window.innerHeight / 2;

    // p5.background(51);

    const values = analyzer.getValue();
    p5.beginShape();

    // 1st dimension for visualizer
    let xoff = 0.0;

    for (let x = 0; x <= p5.width; x += 10) {
      let amp2 = values[x] as number;
      for (let i = 0; i < values.length; i++) {
        amp2 = values[i] as number;
      }
      let y = p5.map(p5.noise(xoff, yoff), 0, 1, 100, 400) + height * amp2/10;
      yoff += amp2/10;
      p5.vertex(x, y);
      xoff += .02;
    }
    yoff += .01;
    p5.vertex(p5.width, p5.height);
    p5.vertex(0, p5.height);

    p5.endShape(p5.CLOSE);
  },
);