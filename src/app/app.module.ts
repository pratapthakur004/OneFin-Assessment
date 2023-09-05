import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './services/interceptors/loader.interceptor';
import { ToggleComponent } from './components/toggle/toggle.component';
import { NavbarComponent } from './layout/navbar/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    LoaderComponent,
    ToggleComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  exports: [LoaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
