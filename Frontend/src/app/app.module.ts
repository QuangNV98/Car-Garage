import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from '@angular/common/http';
import { AppService } from './service/app.service';
import { AuthenticationService } from './service/authentication.service';
import { AgmCoreModule } from '@agm/core';
import { HomepageLayoutComponent } from './layouts/homepage-layout/homepage-layout.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomepageLayoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    ConfirmDialogModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAFFEhrr0CDZ3zXnVNc9HAcdgQ4UBUQec4'
    // })
    //primeng module
    // TableModule,
    // ButtonModule,
    // DynamicDialogModule,
    // ToastModule,
  ],
  providers: [
    AppService,
    AuthenticationService,
    ConfirmationService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
