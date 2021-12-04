// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState } from 'react';
import duck from '../img/duck.gif';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

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
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  const [quack] = useState(
    new Tone.Sampler({
      urls:{
        // sounds used to tune
        C3: "quack.mp3",
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
  );

  const duck_sound =(note:string)=>{
    quack.triggerAttackRelease([`${note}`], 1);
  };

  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <img 
      src={duck}
      onMouseDown={() => duck_sound(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      // className={classNames('ba pointer absolute dim', {
      //   'bg-black black h3': minor, // minor keys are black
      //   'black bg-white h4': !minor, // major keys are white
      // })}
      alt="duck"
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        height: '5rem',
        width: '5rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></img>
  );
}

// eslint-disable-next-line
function DuckSingerWithoutJSX({
  note,
  synth,
  minor,
  index,
}: DuckChoirProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
   const [sample] = useState(
    new Tone.Sampler({
      urls:{
        // sounds used to tune
        C3: "quack.mp3",
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
  );

  const duck_sound =(note:string)=>{
    sample.triggerAttackRelease([`${note}`], 1);
  };

  return React.createElement(
    'div',
    {
      onMouseDown: () => duck_sound(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        height: '2rem',
        width: '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function DuckType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  )
};

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

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: {type: newType} as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
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

      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DuckType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const benthebenguinInstrument = new Instrument('benthebenguin', DuckChoir);
