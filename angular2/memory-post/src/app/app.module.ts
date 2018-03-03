import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MemoryPostComponent } from './memorypost.component';

import { MemoryService } from './memory.service';

@NgModule({
  declarations: [
  	AppComponent,
    MemoryPostComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot([
    	{
    		path: 'memorypost', 
    		component: MemoryPostComponent
    	}
    ])
  ],
  providers: [
  	MemoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
