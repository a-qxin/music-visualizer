// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument} from './instruments/Piano';
import { benthebenguinInstrument } from './instruments/benthebenguinInstrument';
import { WaveformVisualizer } from './visualizers/Waveform';
import { benthebenguinVisualizer } from './visualizers/benthebenguinVisualizer';

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

const instruments = List([PianoInstrument, benthebenguinInstrument]);
const visualizers = List([WaveformVisualizer, benthebenguinVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
