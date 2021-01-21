import { Component, OnInit } from '@angular/core';
import { UserManagementComponent } from 'app/pages/user-management/user-management.component';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard',     title: 'Trang chủ',         icon:'nc-bank',       class: '' },
    { path: '/admin/user-management',        title: 'Thành viên',    icon:'nc-single-02',    class: '' },
    { path: '/admin/equip-management',        title: 'Vật tư',    icon:'nc-settings',    class: '' },
    { path: '/admin/task-planning',        title: 'Đơn hàng',    icon:'nc-delivery-fast',    class: '' },
    { path: '/admin/rescue',          title: 'Cứu hộ',              icon:'nc-pin-3',      class: '' },
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
