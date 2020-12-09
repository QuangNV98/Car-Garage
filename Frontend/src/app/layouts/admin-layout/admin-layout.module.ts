import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementComponent } from 'app/pages/user-management/user-management.component';
import { StaffDetailComponent } from 'app/pages/dialog/staff-detail/staff-detail.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import { CustomerDetailComponent } from 'app/pages/dialog/customer-detail/customer-detail.component';
import { EquipmentManagementComponent } from 'app/pages/equipment-management/equipment-management.component';
import { EquipmentDetailComponent } from 'app/pages/dialog/equipment-detail/equipment-detail.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { TaskPlanningComponent } from 'app/pages/task-planning/task-planning.component';
import { GuaranteeDetailComponent } from 'app/pages/dialog/guarantee-detail/guarantee-detail.component';
import { RepairDetailComponent } from 'app/pages/dialog/repair-detail/repair-detail.component';
import {ToolbarModule} from 'primeng/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import { CustomerDialogComponent } from 'app/pages/dialog/customer-dialog/customer-dialog.component';
import { EquipmentDialogComponent } from 'app/pages/dialog/equipment-dialog/equipment-dialog.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { RescueComponent } from 'app/pages/rescue/rescue.component';
import { AgmCoreModule } from '@agm/core'
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    //primeng module
    TableModule,
    ButtonModule,
    CalendarModule,
    DynamicDialogModule,
    ToastModule,
    InputTextareaModule,
    ToolbarModule,
    DropdownModule,
    FileUploadModule,
    InputNumberModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFFEhrr0CDZ3zXnVNc9HAcdgQ4UBUQec4'
    }),
    AgmDirectionModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UserManagementComponent,
    StaffDetailComponent,
    CustomerDetailComponent,
    EquipmentManagementComponent,
    EquipmentDetailComponent,
    TaskPlanningComponent,
    RepairDetailComponent,
    GuaranteeDetailComponent,
    CustomerDialogComponent,
    EquipmentDialogComponent,
    RescueComponent,
  ],
  providers: [DialogService,MessageService  ],
})

export class AdminLayoutModule {}
