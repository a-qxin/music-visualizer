// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { aqxinInstrument } from './instruments/a-qxin';

import { WaveformVisualizer } from './visualizers/Waveform';
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

const instruments = List([PianoInstrument, aqxinInstrument]);
const visualizers = List([WaveformVisualizer, aqxinVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
