// perlin noise reference: https://p5js.org/examples/math-noise-wave.html
// color ease reference: https://editor.p5js.org/kjhollen/sketches/232-JFW4Gf

// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// 2nd dimension for visualizer
let yoff = 0.0;
let zoff = 0.0;

// color via mouse position
let mix = 0; 
let easing = .05;

export const aqxinVisualizer = new Visualizer(
  'aqxin',
  (p5: P5, analyzer: Tone.Analyser) => {
    const height = window.innerHeight / 2;

    p5.background(51);

    // color via mouse position

    let colorA = p5.color('#c175ff');
    let colorB = p5.color('#4adede');

    let mixTarget = p5.map(p5.mouseX, 0, p5.width, 0.0, 1.0);
    mix = mix + ((mixTarget - mix) * easing);

    let easedColor = p5.lerpColor(colorA, colorB, mix);
    p5.fill(easedColor);

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
      zoff += amp2/2;
      p5.vertex(x, y, 100);
      xoff += .02;
      // xoff += .02 * p5.mouseY/300 * p5.mouseX/300 // mouse x offset for fun
    }
    yoff += .01;
    // p5.vertex(p5.width, p5.height);
    // p5.vertex(0, p5.height);
    p5.translate(-1040, -240, 100);
    // p5.vertex(window.innerWidth, window.innerHeight / 2);
    // p5.vertex(0, window.innerHeight / 2, window.innerHeight);

    p5.endShape(p5.CLOSE);
  },
);