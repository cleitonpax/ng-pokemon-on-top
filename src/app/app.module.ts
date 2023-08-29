import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DetailComponent } from './pages/detail/detail.component';
import { DetailEffects } from './store/effects/detail.effects';
import { EffectsModule } from '@ngrx/effects';
import { ListComponent } from './pages/list/list.component';
import { ListEffects } from './store/effects/list.effects';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { detailReducer } from './store/reducers/detail.reducer';
import { listReducer } from './store/reducers/list.reducer';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DetailEvolutionComponent } from './components/detail-evolution/detail-evolution.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { EvolutionTriggerComponent } from './components/evolution-trigger/evolution-trigger.component';
import { EvolutionItemComponent } from './components/evolution-item/evolution-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    PaginationComponent,
    SpinnerComponent,
    ErrorMessageComponent,
    ListItemComponent,
    DetailEvolutionComponent,
    AvatarComponent,
    EvolutionTriggerComponent,
    EvolutionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ 
      list: listReducer,
      detail: detailReducer
    }, {}),
    EffectsModule.forRoot([
      ListEffects,
      DetailEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
