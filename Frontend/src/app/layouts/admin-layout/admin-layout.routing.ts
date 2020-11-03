import { UserManagementComponent } from 'app/pages/user-management/user-management.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { EquipmentManagementComponent } from 'app/pages/equipment-management/equipment-management.component';
import { TaskPlanningComponent } from 'app/pages/task-planning/task-planning.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: '/admin/dashboard',
        pathMatch: 'full'
    },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-management', component: UserManagementComponent },
    { path: 'equip-management', component: EquipmentManagementComponent },
    { path: 'task-planning', component: TaskPlanningComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent }
];
