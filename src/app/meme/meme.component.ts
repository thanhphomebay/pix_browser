import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { nextImg, prevImg, getCurrentMemeNameAndMeme, getIsLoading, getErrMsg } from '../store/root.reducer';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-meme',
  template: `
  <div [style.background]="'red'" *ngIf="errMsg$|async">{{errMsg$|async}}</div>
  <button mat-button color="primary" (click)="next()">Next</button>
  <button mat-button color="primary" (click)="prev()">Prev</button>
  <!--
  Meme: {{(src$|async)?.memeName}} PixSrc: {{(src$|async)?.memeState?.urls[(src$|async)?.memeState?.idx].id}}
  -->

  <div (swipeleft)="next()" (swiperight)="prev()">
    <ng-container *ngIf="isPix((src$|async)?.memeState?.urls[(src$|async)?.memeState?.idx]?.id); then ispicture; else ismovie"> </ng-container> 
      <ng-template #ispicture>

        <mat-card>
          <mat-card-header>
            <mat-card-title >{{(src$|async)?.memeState?.urls[(src$|async)?.memeState?.idx]?.txt}}</mat-card-title>
          </mat-card-header>
          <img mat-card-image src="{{prefix+((src$|async)?.memeState?.urls[(src$|async)?.memeState?.idx]?.id)}}">
        </mat-card>

      </ng-template>

      <ng-template #ismovie>
        <video id="videoPlayer" controls>
          <source src={{prefix+((src$|async)?.memeState?.urls[(src$|async)?.memeState?.idx]?.id)}} type="video/mp4">
        </video>
      </ng-template>

    

  </div>

  <app-spinner [overlay]="true" *ngIf="isLoading$|async"></app-spinner>
  
  `,
  styles: [`
  video {
    width: 100%;
    max-height: 100%;
  }
  `]
})
export class MemeComponent implements OnInit {
  // prefix = 'https://lh3.googleusercontent.com/';
  prefix = 'http://' + environment.server.ip + ':' + environment.server.port + '/list/';
  src$ = this.store.pipe(select(getCurrentMemeNameAndMeme));
  isLoading$ = this.store.pipe(select(getIsLoading));
  errMsg$ = this.store.pipe(select(getErrMsg));


  constructor(private store: Store<object>) { }

  ngOnInit(): void {
  }
  next() {
    this.store.dispatch(nextImg());
    console.log("next")
  }

  prev() {
    this.store.dispatch(prevImg());
  }
  isPix(name: string) {
    if (name) {
      const ext = name.split('.').pop().toLocaleLowerCase();
      switch (ext) {
        case 'jpg':
        case 'png':
          return true;
        case 'mov':
          return false;
      }
    }
    return false;
  }
}
