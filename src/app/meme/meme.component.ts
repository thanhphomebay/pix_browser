import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { nextImg, prevImg, getCurrentMemeNameAndMeme, getIsLoading, getErrMsg } from '../store/root.reducer';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html', 
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
