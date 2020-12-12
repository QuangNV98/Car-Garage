import { Component, OnInit } from '@angular/core';
import { UserManagementComponent } from 'app/pages/user-management/user-management.component';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/admin/user-management',        title: 'User Management',    icon:'nc-single-02',    class: '' },
    { path: '/admin/equip-management',        title: 'Equipment',    icon:'nc-settings',    class: '' },
    { path: '/admin/task-planning',        title: 'Task Planning',    icon:'nc-delivery-fast',    class: '' },
    { path: '/admin/rescue',          title: 'SoS',              icon:'nc-pin-3',      class: '' },
    // { path: '/admin/icons',         title: 'Icons',             icon:'nc-palette',    class: '' },
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
