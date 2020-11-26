import { Component, OnInit } from '@angular/core';
import { StaffRequest } from 'app/model/staff-request';
import { StaffService } from 'app/service/staff.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  request: StaffRequest;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: StaffService
  ) { }

  ngOnInit(): void {
    if (this.config.data) {
      if (this.config.data.CRUD == "C") {
        //create
        this.request = new StaffRequest();
        this.request.ROLE = 'CUSTOMER';
      
      } else if (this.config.data.CRUD == "U") {
        //update
        this.request = Object.assign(this.config.data.USER);
      }
    }
  }

  doSubmit() {
    if (this.doValidate()) {
      if(this.request.ID != null && this.request.ID != '') {
        this.doUpdate();
      } else {
        this.doCreate();
      }
    }
  }

  doValidate() {
    if (this.request.NAME == null || this.request.NAME == "") {
      alert("Enter name...");
      return false;
    }

    if (this.request.PHONE_NUM == null || this.request.PHONE_NUM == "") {
      alert("Enter phonenumm...");
      return false;
    }

    return true;
  }

  doCreate() {
    this.service.doCreateUser(this.request).subscribe(
      response => {
        alert(response['STATE']);
      }
    )
  }

  doUpdate() {
    this.service.doUpdateUser(this.request).subscribe((response) => {
      if (response) {
        alert(response['STATE']);
      }
    });
  }

}
