import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';



@NgModule({
	imports: [
    	BrowserModule, 
    	FormsModule,  // <-- import the FormsModule before binding with [(ngModel)]
      HttpModule, 
      InMemoryWebApiModule.forRoot(InMemoryDataService), 
      AppRoutingModule
     ], 
  	// the `declarations` array contains a list of application components, pipes, and directives that belong to the module.
  	// A component must be declared in a module before other components can reference it.
  	declarations: [
    	AppComponent, 
    	DashboardComponent, 
      HeroDetailComponent, 
    	HeroesComponent, 
      HeroSearchComponent
  	],
  	providers: [HeroService],
  	bootstrap: [AppComponent]
})
export class AppModule { }