import { RescueComponent } from './../../pages/rescue/rescue.component';
import { UserManagementComponent } from 'app/pages/user-management/user-management.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
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
    { path: 'rescue', component: RescueComponent },
];
