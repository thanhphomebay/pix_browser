import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink='home'>Home</button>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      margin-top: 0px;
      height: 35px;
    }
  `]
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
