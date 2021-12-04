// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * Contains implementation of an Instruments.
 ** ------------------------------------------------------------------------ */

  

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: Tone.Synth;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
}

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        'w-100 h3 bb b--light-gray flex justify-between items-center ph4'
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;
  const [synth, setSynth] = useState(
    new Tone.Synth({
      oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );
  
  // ben instrument
  const [quack] = useState(
    new Tone.Sampler({
      urls:{
        // sounds used to tune
        C3: "quack.mp3",
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
  );


  // Tony instrument
  const [wow] = useState(
    new Tone.Sampler({
      urls:{
        E4: "wowc.mp3",
        A4: "wowd.mp3",
      },
      baseUrl:"http://localhost:3000/",
    }).toDestination()
  );

  const [aqxin] = useState(
    new Tone.Sampler({
      urls:{
        A3: "flute_a3.mp3",
      },
    }).toDestination()
  );

  const [kevin] = useState(
    new Tone.MembraneSynth({
      oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
    }).toDestination()
  );

  const notes = state.get('notes');

  // useEffect(() => {

  //   if (notes && synth) {
  //     let eachNote = notes.split(' ');
  //     let noteObjs = eachNote.map((note: string, idx: number) => ({
  //       idx,
  //       time: `+${idx / 4}`,
  //       note,
  //       velocity: 1,
  //     }));

  //     new Tone.Part((time, value) => {
  //       // the value is an object which contains both the note and the velocity
  //       synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
  //       if (value.idx === eachNote.length - 1) {
  //         dispatch(new DispatchAction('STOP_SONG'));
  //       }
  //     }, noteObjs).start(0);

  //     Tone.Transport.start();

  //     return () => {
  //       Tone.Transport.cancel();
  //     };
  //   }
    
  //   return () => {};
  // }, [notes, synth, dispatch]);

  let con:Tone.Sampler |Tone.MembraneSynth|Tone.Synth |undefined;

  useEffect(() => {
      switch(instrument.name){
        case "TonyT415":{
          synth.disconnect();
          con = wow;
          break;
        }
        case "benthebenguin":{
          synth.disconnect();
          con = quack;
          break;
        }
        case "aqxin":{
          synth.disconnect();
          con = aqxin;
          break;
        }
        case "kevingithub0727":{
          synth.disconnect();
          con = kevin;
          break;
        }
        default:
          con = synth;
          break;
      }

      
      if (notes && con) {
        let eachNote = notes.split(' ');
        let noteObjs = eachNote.map((note: string, idx: number) => ({
          idx,
          time: `+${idx / 4}`,
          note,
          velocity: 1,
        }));

        new Tone.Part((time, value) => {
          // the value is an object which contains both the note and the velocity
          if(con) {
            con.triggerAttackRelease(value.note, '4n', time, value.velocity);
            if (value.idx === eachNote.length - 1) {
              dispatch(new DispatchAction('STOP_SONG'));
            }
          }
        }, noteObjs).start(0);

        Tone.Transport.start();

        return () => {
          Tone.Transport.cancel();
        };
      }
      
    
    return () => {};
  }, [notes, con, dispatch]);

  useEffect(() => {
    if (instrument.name === "kevingithub0727") {
      setSynth(oldSynth => {
        oldSynth.disconnect();
  
        return new Tone.MembraneSynth({
          oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
        }).toDestination();
      });
    } 
    else{
      setSynth(oldSynth => {
        oldSynth.disconnect();
  
        return new Tone.Synth({
          oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
        }).toDestination();
      });
    }
  }, [state.get('instrument')])


  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={'bg-white absolute right-0 left-0'}
        style={{ top: '4rem' }}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
        />
      </div>
    </div>
  );
};
