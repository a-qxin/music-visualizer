// 3rd party library imports
import * as Tone from 'tone';
import { useState } from 'react'; // for sample
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import shrimp from '../img/shrimp.png';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
// import { InstrumentSample, InstrumentPropsSample } from '../InstrumentsSampler';

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

  // const [sample] = useState(
  //   new Tone.Sampler({
  //     urls: {
  //       A1: "flute_c3.mp3",
  //     },
  //     baseUrl: "http://localhost:3000",
  //   }).toDestination()
  // );

  // const sample_sound = (note: string) => {
  //   sample.triggerAttackRelease([`${note}`], 1);
  // };

  const [sample] = useState(
    new Tone.Sampler({
      urls:{
        A3: "flute_c3.mp3"
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
    );
    
  const sample_sound =(note:string)=>{
    sample.triggerAttackRelease([`${note}`],1);
  };

  /**
   * This React component corresponds to either a major or minor key in the flute.
   * See `FluteKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      // onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      // onMouseDown={() => sample_sound(`${note}`)}
      onMouseDown={()=>sample_sound(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></div>
  );
}

// eslint-disable-next-line
function FluteKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: FluteKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `FluteKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function FluteType({ title, onClick, active }: any): JSX.Element {
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

  // const setFluteSample = () => {
  //   const toot = new Tone.Sampler({
  //     urls:{
  //       A1: "flute_c3.mp3",
  //     },
  //     baseUrl: "http://localhost:3000/",
  //     onload: () => {
  //       toot.triggerAttackRelease(["A1"], 1);
  //     }
  //   }).toDestination();
  //   console.log('hi i am playing a toot');
  //   return toot;
  // };

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
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

  const shrimpImage = {
    width: "90px",
  };

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <FluteKey
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

      <div className={'pl4 flex'}>
        {/* image div */}
        <div className={'pl4 pt4 flex'}>
          <img 
            style={shrimpImage} 
            src={shrimp}
            // onClick={() => setFluteSample}
            />
        </div>
        
      </div>
      
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <FluteType
            key={o}
            title={o}
            // onClick={() => setFluteSample}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const aqxinInstrument = new Instrument('aqxin', Flute);
