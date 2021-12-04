// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
// import {Instrument2, InstrumentPropsTEST} from '../TEST';


/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface PianoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function PianoKey({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
   const [wow] = useState(
    new Tone.Sampler({
      urls:{
        A1: "wowc.mp3",
        // A4: "wowd.mp3",
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
    );

  const wowBoard =(note:string)=>{
    wow.triggerAttackRelease([`${note}`],1);
  };
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      // onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseDown={()=>wowBoard(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-yellow black h3': minor, // minor keys are black
        'black bg-red h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        
        borderRadius: '50%',
        top: 1,
        left: `${index * 5 }rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '2rem' : '4rem',
        height: minor ? '2rem' : '4rem',
        marginLeft: minor ? '0.25rem' : 1,
      }}
    >
      <img src='http://localhost:3000/OWEN.png' alt='test' width="100" height="100" 
      style={{
        // CSS
        
        borderRadius: '50%',
        top: 1,
        left: `${index * 5}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '2rem' : '6rem',
        height: minor ? '2rem' : '5rem',
        marginLeft: minor ? '0.25rem' : 0,
        
      }}></img>
      
    </div>
  );
}




function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

//   const wowboard = () => {
//     setsampler(oldsampler => {
//       oldsampler.disconnect();

//       const wow = new Tone.Sampler({
//       urls:{
//         A1: "wowc.mp3",
//         A2: "wowd.mp3"
//       },
//         baseUrl:"http://localhost:3000/",
        
//     }).toDestination();
//     return wow;
//     })
    
// };

// const [deepOwen] = useState(
//   new Tone.Sampler({
//     urls:{
//       A1: "wowc.mp3",
//       A2: "wowd.mp3"
//     },
//     baseUrl:"http://localhost:3000/",
//   }).toDestination()
// );

//testing buttons to sound
// const deepwow =()=>{
//   deepOwen.triggerAttackRelease(["C1"],1);
// };

const [lightning] = useState(
  new Tone.Sampler({
    urls:{
      A1: "speed.mp3",
      A2: "kachow.mp3",
      A3: "kachow2.mp3",
    },
    baseUrl:"http://localhost:3000/",
  }).toDestination()
);

const amSpeed =()=>{
  lightning.volume.value = -15;
  lightning.triggerAttackRelease([`a1`],5);
};
const kachow =()=>{
  lightning.volume.value = 0;
  lightning.triggerAttackRelease([`a2`],5);
};
const kachow2 =()=>{
  lightning.volume.value = 0;
  lightning.triggerAttackRelease([`a3`],5);
};



  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 4).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      {/* Location for buttons near the bottom*/}
      <img src='http://localhost:3000/Lightning.png' alt='cars1' width="100" height="50" onMouseDown={amSpeed}></img>
      <img src='http://localhost:3000/Lightning.png' alt='cars2' width="100" height="50" onClick={kachow}></img>
      <img src='http://localhost:3000/Lightning.png' alt='cars3' width="100" height="50" onClick={kachow2}></img>
    </div>
  );
}

export const TonyT415Instrument = new Instrument('TonyT415', Piano);