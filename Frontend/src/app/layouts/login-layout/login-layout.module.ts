import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginLayoutRoutes } from './login-layout-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        LoginLayoutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginLayoutRoutes

    ]
})
export class LoginLayoutModule { }