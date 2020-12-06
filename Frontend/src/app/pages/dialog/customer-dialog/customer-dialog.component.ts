import { Component, OnInit } from '@angular/core';
import { StaffService } from 'app/service/staff.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  dataGridCustomer: Object[] = [];
  cols_cus: any[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public messageService: MessageService,
    private serviceStaff: StaffService
  ) { }

  ngOnInit(): void {
    this.getListCustomer();

    this.cols_cus = [
      { field: "NAME", header: "Name" },
      { field: "USERNAME", header: "Username" },
      { field: "PHONE_NUM", header: "Phone Number" },
      { field: "ADDRESS", header: "Address" },
    ];
  }

  getListCustomer() {
    this.serviceStaff.getAllCustomer().subscribe((response) => {
      this.dataGridCustomer = response;
    });
  }

  selectedCustomer(event, rowData) {
    this.ref.close(rowData);
  }

}
