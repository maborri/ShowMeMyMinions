import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetUserIdService } from './services/get-user-id.service';
import { GetMatchHistoryService } from './services/get-match-history.service';
import { UserBasicInfoComponent } from './components/user-basic-info/user-basic-info.component';
import { CompareTableComponent } from './components/compare-table/compare-table.component';
import { FinalScoreTableComponent } from './components/final-score-table/final-score-table.component';
import { HeaderComponent } from './components/header/header.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { ProPlayerListComponent } from './components/pro-player-list/pro-player-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    UserBasicInfoComponent,
    CompareTableComponent,
    FinalScoreTableComponent,
    HeaderComponent,
    ResultDisplayComponent,
    ProPlayerListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    GetUserIdService,
    GetMatchHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
