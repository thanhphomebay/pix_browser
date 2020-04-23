import { Injectable } from "@angular/core"
import { LoadMemeRequest, getCurrentMemeNameAndMeme, LoadMemeSucess, LoadMemeFailure, LoadRootRequest, LoadRootSucess, LoadRootFailure } from "./root.reducer"
import { createEffect, ofType, Actions } from "@ngrx/effects"
import { Store, select, createAction } from "@ngrx/store"
import { map, filter, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { FbService } from '../meme/services/fb.service';
import { MemeService } from '../meme/services/meme.service';

@Injectable()
export class RootEffects {

    constructor(private store: Store<object>, private dbService: FbService, private action$: Actions, private memeService: MemeService) { }

    meme$ = createEffect(() => {
        return this.store.pipe(
            select(getCurrentMemeNameAndMeme),
            filter(
                x => x.memeName !== undefined && x.memeState === undefined
            ),
            map(y => { debugger; return LoadMemeRequest({ id: y.memeName }) }),
        )
    });

    loadingmeme$ = createEffect(() => {
        return this.action$.pipe(
            ofType(LoadMemeRequest),
            mergeMap(action => {
                console.log(action.id);
                // return this.dbService.getAll(action.id).pipe(
                return this.memeService.getFolder(action.id).pipe(
                    map(payload => { console.log(payload); return LoadMemeSucess({ payload, memeName: action.id }) }),
                    catchError(err => of(LoadMemeFailure({ errMsg: err.message }))
                    )
                )
            })
        )
    })
    loadingroot$ = createEffect(() => {
        return this.action$.pipe(
            ofType(LoadRootRequest),
            mergeMap(action => {
                // return this.dbService.getAll(action.id).pipe(
                return this.memeService.getRoot().pipe(
                    map(payload => { console.log(payload); return LoadRootSucess({ payload }) }),
                    catchError(err => of(LoadRootFailure({ errMsg: err.message }))
                    )
                )
            })
        )
    })
}