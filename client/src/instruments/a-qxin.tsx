// 3rd party library imports
import * as Tone from 'tone';
import { useState } from 'react'; // for Tone.Sample
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import shrimp from '../img/shrimp.png';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the flute key
}

export function FluteKey({
  note,
  synth,
  minor,
  index,
}: FluteKeyProps): JSX.Element {

  const [sample] = useState(
    new Tone.Sampler({
      urls:{
        A3: "flute_a3.mp3",
      },
    }).toDestination()
  );
    
  const flute_sample = (note: string) => {
    sample.triggerAttackRelease([`${note}`], 1);
  };

  const shrimpImage = {
    width: "90px",
  };

  /**
   * This React component corresponds to either a major or minor key in the flute.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={()=> flute_sample(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('pointer absolute dim', {
      })}
      style={{
        top: minor ? 0 : '100px',
        left: `${index * 6}rem`,
        width: '5rem',
        marginLeft: '.25rem',
      }}
    >
      <img src={shrimp} style={shrimpImage} />
    </div>
  );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
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

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 5).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <FluteKey
                key={note}
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 3) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const aqxinInstrument = new Instrument('aqxin', Flute);
