
import { createFeatureSelector, createAction, createReducer, createSelector, Action, props, on, select } from "@ngrx/store";
import { mutableOn } from 'ngrx-etc';
import { selectRouterParam } from '../router.store/router.selectors';

export const nextImg = createAction('[meme] next meme');
export const prevImg = createAction('[meme] prev meme');
export const LoadMemeRequest = createAction('[meme] loading request', props<{ id: string }>());
export const LoadMemeSucess = createAction('[meme] loading sucess', props<{ payload: any, memeName: string }>());
export const LoadMemeFailure = createAction('[meme] loading failure', props<{ errMsg: string }>());

export const LoadRootRequest = createAction('[root] loading request');//, props<{ id: string }>());
export const LoadRootSucess = createAction('[root] loading sucess', props<{ payload }>());
export const LoadRootFailure = createAction('[root] loading failure', props<{ errMsg: string }>())

export interface Meme {
    id: string;
    txt: string;
}

export interface MemeState {
    idx: number | null;
    urls: Meme[] | null;
}
export interface MemesState {
    memeRoot: string[],
    isLoading: boolean;
    errMsg: string | null;
    memes: Record<string, MemeState> | null
}

interface ActionWithMemeId extends Action {
    id: string;
}

const initState: MemesState = {
    memeRoot: [],
    isLoading: false,
    errMsg: null,
    memes: {}//{ 'thegood': { idx: 0, urls: ['pix0', 'pix1', 'pix2'] }, 'thebad': { idx: 0, urls: ['thebad0', 'thebad1'] } }
}


function _reduceMeme<A extends ActionWithMemeId>(reducer: (state: MemeState, len: number) => void) {
    return (state: MemesState, action: A) => {
        debugger;
        const memestate = state.memes[action.id];
        const len = state.memes[action.id].urls.length;
        memestate && reducer(memestate, len);
    }
}
function flipZero(idx: number, len: number) {
    if (idx < 0)
        return len - 1;
    return idx;
}
export const memeReducer = createReducer<MemesState>(
    initState,
    on(LoadMemeRequest, LoadRootRequest, s => ({...s, isLoading : true, errMsg : null })),
    on(LoadMemeFailure, LoadMemeFailure, (s, action) => ({ ...s, isLoading : false, errMsg : action.errMsg })),
    on(LoadMemeSucess, (s, action) => ({...s, isLoading : false, errMsg : null, memes : { ...s.memes, [action.memeName]: { idx: 0, urls: action.payload } }})),
    on(LoadRootSucess, (s, action) => ({ ...s, isLoading: false, errMsg: null, memeRoot: action.payload })),
    mutableOn(nextImg, _reduceMeme((memestate, len) => memestate.idx = ++memestate.idx % len)),
    mutableOn(prevImg, _reduceMeme((memestate, len) => memestate.idx = flipZero(memestate.idx - 1, len) % len))

)


//selector
export const MEMES_STATE_KEY = 'memestate';
const getMemesState = createFeatureSelector<MemesState>(MEMES_STATE_KEY);
export const getCurrentMemeName = selectRouterParam('id');
const getCurrentMemeState = createSelector(
    getMemesState,
    getCurrentMemeName,
    (s, p) => { debugger; return s.memes[p] }
);

/*export const getCurrentMemeSrc = createSelector(
    getCurrentMemeState,
    s => s.urls[s.idx]
)*/
export const getCurrentMemeNameAndMeme = createSelector(
    getCurrentMemeName,
    getCurrentMemeState,
    (memeName, memeState) => ({ memeName, memeState })
);

export const getIsLoading = createSelector(getMemesState, s => s && s.isLoading);
export const getErrMsg = createSelector(getMemesState, s => s && s.errMsg);
export const getMemeRoot = createSelector(getMemesState, s => s && s.memeRoot);