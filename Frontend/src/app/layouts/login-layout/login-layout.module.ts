import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginLayoutRoutes } from './login-layout-routing.module';
import { RouterModule } from '@angular/router';
import { AppService } from 'app/service/app.service';
import { AuthenticationService } from 'app/service/authentication.service';



@NgModule({
    declarations: [
        LoginLayoutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginLayoutRoutes

    ],
    providers: [
        AppService,
        AuthenticationService
    ]
})
export class LoginLayoutModule { }