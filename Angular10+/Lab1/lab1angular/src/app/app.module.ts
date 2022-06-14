import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { SomePageModule } from './some-page/some-page.module';
import { RouterModule, Routes } from '@angular/router';
import { SomePageComponent } from './some-page/some-page.component';

const routes: Routes = [
  { path: '', component: SomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot(),
    SomePageModule,
    NbSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
