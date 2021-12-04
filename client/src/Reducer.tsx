// 3rd party
import { List, Map, fromJS } from 'immutable';

// project deps
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * All user input is handled by DispatchAction.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 * 'songs': List<string>
 * 'notes': List<{id: number, songTitle: string, notes: string}>
 */
type DispatchArgs = {
  [key: string]: any;
};

// A simple algebraic data-type with string literal types
type DispatchActionType =
  | 'SET_SOCKET'
  | 'DELETE_SOCKET'
  | 'SET_SONGS'
  | 'PLAY_SONG'
  | 'STOP_SONG'
  | 'SET_LOCATION'
  | 'SEARCH_SONGS';

export class DispatchAction {
  readonly type: DispatchActionType;
  readonly args: Map<string, any>;

  constructor(type: DispatchActionType, args?: DispatchArgs) {
    this.type = type;
    this.args = fromJS(args) as Map<string, any>;
  }
}

/** ------------------------------------------------------------------------ **
 * Top-level application reducer.
 ** ------------------------------------------------------------------------ */

export function appReducer(state: AppState, action: DispatchAction): AppState {
  const { type, args } = action;

  // console.debug(`${type}`);

  // Question: Does this function remind of you registering callbacks?
  const newState = (() => {
    switch (type) {
      case 'SET_SOCKET': {
        const oldSocket = state.get('socket');
        if (oldSocket) {
          oldSocket.close();
        }

        return state.set('socket', args.get('socket'));
      }
      case 'DELETE_SOCKET': {
        return state.delete('socket');
      }
      case 'SET_SONGS': {
        const songs = args.get('songs');
        return state.set('songs', songs);
      }
      case 'PLAY_SONG': {
        const notes = state
          .get('songs')
          .find((s: any) => s.get('id') === args.get('id'))
          .get('notes');
        return state.set('notes', notes);
      }
      case 'STOP_SONG': {
        return state.delete('notes');
      }
      case 'SET_LOCATION': {
        const pathname = args.getIn(['location', 'pathname'], '') as string;
        const search = args.getIn(['location', 'search'], '') as string;

        const instrumentName: string = pathname.substring(1);
        const visualizerName: string =
          new URLSearchParams(search.substring(1)).get('visualizer') ?? '';
        const instruments: List<Instrument> = state.get('instruments');
        const visualizers: List<Visualizer> = state.get('visualizers');

        const instrument = instruments.find(i => i.name === instrumentName);
        const visualizer = visualizers.find(v => v.name === visualizerName);

        return state
          .set('instrument', instrument)
          .set('visualizer', visualizer);
      }
      case 'SEARCH_SONGS': {

        let searchFilter = (input: any): boolean => {
          var searchString = args.get('songTitle').toLowerCase();
          var title = input.get('songTitle').toLowerCase();
          var album = input.get('album').toLowerCase();
          var artist = input.get('artist').toLowerCase();
          if(title.includes(searchString)) {
            return true;
          }
          else if(album.includes(searchString)) {
            return true;
          }
          else if(artist.includes(searchString)) {
            return true;
          }

          // search failed
          return false;
        }
        
        const results = state
          .get('songs')
          .filter((s:any) => searchFilter(s));
          // .filter((s:any) => s.get('songTitle') === args.get('songTitle'));
          
        console.log('Songs: ' + state.get('songs'));

        // TESTING
        //works
        // console.log('reducer search input: ' + args.get('songTitle'));
        // //Works
        // console.log('reducer results: ' + results);
        // //nope
        // console.log('song titles: ' + state.get('songs').get('songTitle'));
        // //works
        // console.log('reducer songs: ' + state.get('songs').filter((s:any) => s.get('songTitle') === args.get('songTitle')));
        // //nope
        // console.log('first song: ' + state.get('songs').filter((s:any) => s.get('id') === 1).get('songTitle'));

        // //test
        // state.set('results', results);
        // console.log('reducer state results: ' + state.get('results'));
        // console.log(state);

        return state.set('results', results);
      }
      default:
        console.error(`type unknown: ${type}\n`, args.toJS());
        return state;
    }
  })();

  // console.debug(newState.update('socket', s => (s ? '[socket]' : s)).toJS());

  return newState;
}
