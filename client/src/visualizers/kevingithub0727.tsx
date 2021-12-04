// 3rd party library imports
import p5 from 'p5';
import * as Tone from 'tone';
import img from 'img/homepage_bg.jpg';

// project imports
import { Visualizer } from '../Visualizers';


export const kevingithub0727Visualizer = new Visualizer(
  'kevingithub0727',
  (p5: p5, analyzer: Tone.Analyser) => {
    p5.setup = () => {
      p5.createCanvas(720, 400, p5.WEBGL);
      
    }
    
    p5.draw = () => {
      p5.background(0, 0, 0, 255);

      p5.translate(240, 0, 0);
      p5.push();
      const values = analyzer.getValue();
      
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        p5.translate(amplitude * 10, amplitude * 10, amplitude * 10);
        p5.rotateZ(amplitude * 2);
        p5.rotateX(amplitude * 2);
        p5.rotateY(amplitude * 2);
      }
      
      p5.torus(70, 20,16);
      p5.pop();
    }
   
  }
);
