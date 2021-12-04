// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument} from './instruments/Piano';
import { benthebenguinInstrument } from './instruments/benthebenguinInstrument';
import { WaveformVisualizer } from './visualizers/Waveform';
import { benthebenguinVisualizer } from './visualizers/benthebenguinVisualizer';
import {PianoInstrument2} from './instruments/tonyt415';
import { WaveformVisualizer2 } from './visualizers/tonyt415';

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

const instruments = List([PianoInstrument, benthebenguinInstrument, PianoInstrument2]);
const visualizers = List([WaveformVisualizer, benthebenguinVisualizer, WaveformVisualizer2]);

export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
