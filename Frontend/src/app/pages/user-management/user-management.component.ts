import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { StaffDetailComponent } from "../dialog/staff-detail/staff-detail.component";
import { MessageService } from "primeng/api";
import { CustomerDetailComponent } from "../dialog/customer-detail/customer-detail.component";
import { StaffService } from "app/service/staff.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class UserManagementComponent implements OnInit {

  dataGridStaff: Object[] = [];
  dataGridCustomer: Object[] = [];

  cols_cus: any[];
  cols: any[];
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private serviceStaff: StaffService
  ) {}

  ngOnInit(): void {
    this.getListStaff();
    this.getListCustomer();

    this.cols_cus = [
      { field: "NAME", header: "Name" },
      { field: "USERNAME", header: "Username" },
      { field: "PHONE_NUM", header: "Phone Number" },
      { field: "ADDRESS", header: "Address" },
    ];

    this.cols = [
      { field: "NAME", header: "Name" },
      { field: "USERNAME", header: "Username" },
      { field: "PHONE_NUM", header: "Phone Number" },
      { field: "EMAIL", header: "Email" },
      { field: "COMP_NM", header: "Company" },
    ];
  }

  getListStaff() {
    this.serviceStaff.getAllStaff().subscribe((response) => {
	  this.dataGridStaff = response;
    });
  }

  getListCustomer() {
    this.serviceStaff.getAllCustomer().subscribe((response) => {
      this.dataGridCustomer = response;
    });
  }

  selectedStaff(event, rowData) {
    this.ref = this.dialogService.open(StaffDetailComponent, {
      header: "Employee Information",
      width: "70%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {
        CRUD: rowData == null ? "C" : "U",
        USER: rowData ? rowData : null,
      },
    });

    this.ref.onClose.subscribe(() => {
      this.getListStaff();
    });
  }

  selectedCustomer(event, rowData) {
    this.ref = this.dialogService.open(CustomerDetailComponent, {
      header: "Customer Information",
      width: "30%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {
        CRUD: rowData == null ? "C" : "U",
        USER: rowData ? rowData : null,
      },
    });

    this.ref.onClose.subscribe(() => {
		this.getListCustomer();
	});
  }
}
