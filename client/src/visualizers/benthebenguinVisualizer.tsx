// 3rd party library imports
import { NotSentFilled16, Translate16 } from '@carbon/icons-react';
import P5 from 'p5';
import * as Tone from 'tone';
import { StereoFeedbackEffect } from 'tone/build/esm/effect/StereoFeedbackEffect';
import { SideNav } from '../SideNav';

// project imports
import { Visualizer } from '../Visualizers';

// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

export const benthebenguinVisualizer = new Visualizer(
  'benthebenguin',
  (p5: P5, analyzer: Tone.Analyser) => {

    let angle = 0;
    let anglePercent = 0;

    function getCurrentAngle() {
        return p5.map(anglePercent % 100, 0, 100, 0, 360);
    }

    p5.draw = () => {
      anglePercent = anglePercent + 0.01;
      p5.background(0, 0, 0, 255);
      p5.stroke(173, 228, 255, 255);
      p5.strokeWeight(1);
      p5.angleMode("radians");
      p5.noFill();
      p5.translate(-100, 0);
      p5.push();
      p5.rotate(getCurrentAngle());
      

      const values = analyzer.getValue();
      p5.beginShape();
      for(var i = 0; i <= 180; i++) {
        
        var amplitude = values[i] as number;
        var r = p5.map(amplitude * 100, -50, 50, 80, 150);

        var x = r * Math.sin(i);
        var y = r * Math.cos(i);
        
        p5.vertex(x, y);
      }
      p5.endShape();
      p5.pop();
    }
  },
)
