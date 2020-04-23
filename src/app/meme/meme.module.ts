import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemeComponent } from './meme.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
  { path: ':id', component: MemeComponent }
]

@NgModule({
  declarations: [MemeComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
   
  ]
})
export class MemeModule { }
