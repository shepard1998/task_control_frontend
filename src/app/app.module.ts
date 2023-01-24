import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TaskFooterComponent } from './tasks-page/task-footer/task-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksPageComponent,
    TaskFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
