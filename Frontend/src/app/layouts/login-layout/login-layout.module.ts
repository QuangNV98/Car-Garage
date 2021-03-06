import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginLayoutRoutes } from './login-layout-routing.module';
import { RouterModule } from '@angular/router';
import { AppService } from 'app/service/app.service';
import { AuthenticationService } from 'app/service/authentication.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
    declarations: [
        LoginLayoutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginLayoutRoutes,
        ToastModule
    ],
    providers: [
        AppService,
        AuthenticationService,
        MessageService
    ]
})
export class LoginLayoutModule { }