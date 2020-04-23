import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getMemeRoot, MemesState, LoadRootRequest } from './store/root.reducer';

@Component({
  selector: 'app-home',
  template: `
    <ol>
      <li *ngFor="let name of names$|async"><a routerLink="/meme/{{name}}">{{name}}</a></li>
    </ol>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  names$: Observable<string[]> = this.store.pipe(select(getMemeRoot));
  constructor(private store: Store<MemesState>) {
    this.store.dispatch(LoadRootRequest());
  }

  ngOnInit(): void {

  }

}
