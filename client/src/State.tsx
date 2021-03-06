// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { kevingithub0727Instrument } from './instruments/kevingithub0727';
import { kevingithub0727Visualizer } from './visualizers/kevingithub0727';
import { benthebenguinInstrument } from './instruments/benthebenguinInstrument';
import { benthebenguinVisualizer } from './visualizers/benthebenguinVisualizer';
import { TonyT415Instrument } from './instruments/tonyt415';
import { TonyT415Visualizer } from './visualizers/tonyt415';
import { aqxinInstrument } from './instruments/a-qxin';
import { aqxinVisualizer } from './visualizers/a-qxin';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([PianoInstrument, benthebenguinInstrument, TonyT415Instrument, aqxinInstrument, kevingithub0727Instrument]);
const visualizers = List([WaveformVisualizer, benthebenguinVisualizer, TonyT415Visualizer, aqxinVisualizer, kevingithub0727Visualizer]);

export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
