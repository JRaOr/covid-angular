import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SharedComponent } from './shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'
import { RouterModule } from '@angular/router';
import { RegionComponent } from './region/region.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    DashboardComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'region/:id', component: RegionComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
