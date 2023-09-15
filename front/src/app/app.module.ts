import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';
import { HttpErrorInterceptor } from '@core/interceptors/http-error/http-error.interceptor';
import { CustomTitleStrategy } from '@core/services/title-strategy/custom-title-strategy';
import { ClassroomListComponent } from '@features/classroom/pages/classroom-list/classroom-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgGridModule } from 'ag-grid-angular';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutModule,
    AgGridModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
  
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtTokenInterceptor,
    //   multi: true
    // },
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy
    },
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClassroomListComponent]
})
export class AppModule { }



/**
 * Class for translate module
 * AOT compilation support
 **/
 export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}