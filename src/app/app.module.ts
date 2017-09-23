import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';

import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GetUserIdService } from './services/get-user-id.service';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [GetUserIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
