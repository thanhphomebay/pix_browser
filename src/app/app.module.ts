import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { Routes, RouterModule } from '@angular/router';
import { ParamsSerializer } from './router.store/params-serializer';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MyHammerConfig } from './my-hammer-config';
import { NotfoundComponent } from './core/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { actionEnricher } from './meme/meme.store/action-enricher.reducer';
import { MEMES_STATE_KEY, memeReducer } from './store/root.reducer';
import { RootEffects } from './store/root.effects';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'meme', loadChildren: () => import('./meme/meme.module').then(m => m.MemeModule) },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ routerstate: routerReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer: ParamsSerializer,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    StoreModule.forFeature(MEMES_STATE_KEY, memeReducer, {
      metaReducers: [actionEnricher],
    }),
    EffectsModule.forRoot([RootEffects]),

  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
