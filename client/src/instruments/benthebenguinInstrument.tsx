// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState } from 'react';
import duck from '../img/duck.gif';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { off } from 'process';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for DuckChoir.
 ** ------------------------------------------------------------------------ */

interface DuckChoirProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function DuckSinger({
  note,
  synth,
  minor,
  index,
}: DuckChoirProps): JSX.Element {
  const [quack] = useState(
    new Tone.Sampler({
      urls:{
        // duck audio
        C3: "quack.mp3",
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
  );

  const duck_sound =(note:string)=>{
    quack.triggerAttackRelease([`${note}`], 1);
  };

  return (
      <img 
        src={duck}
        id="duckSinger"
        onMouseDown={() => duck_sound(`${note}`)}
        onMouseUp={() => synth?.triggerRelease('+0.25')}
        alt="duck"
        style={{
          // CSS
          top: 0,
          left: `${index * 2}rem`,
          // size of duck changes from left to right
          height: `${index * 0.5}rem`,
          width: `${index * 0.5}rem`,
          marginLeft: 0,
        }}
      ></img>
  );
}

function DuckChoir({ synth, setSynth }: InstrumentProps): JSX.Element {
  const ducks = List([
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


  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 4).map(octave =>
          ducks.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <DuckSinger
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave-2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const benthebenguinInstrument = new Instrument('benthebenguin', DuckChoir);
