import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DetailComponent } from './pages/detail/detail.component';
import { EffectsModule } from '@ngrx/effects';
import { ListComponent } from './pages/list/list.component';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PokemonsEffects } from './store/effects/pokemons.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { pokemonsReducer } from './store/reducers/pokemons.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      pokemons: pokemonsReducer 
    }, {}),
    EffectsModule.forRoot([
      PokemonsEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
