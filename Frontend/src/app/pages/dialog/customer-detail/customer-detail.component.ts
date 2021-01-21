import { Component, OnInit } from '@angular/core';
import { StaffRequest } from 'app/model/staff-request';
import { StaffService } from 'app/service/staff.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {MessageService, ConfirmationService} from 'primeng/api';

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
    private service: StaffService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn muốn thực hiện thay đổi?',
        header: 'Xác nhận',
        icon: 'pi pi-info-circle',
        accept: () => {
          if(this.request.ID != null && this.request.ID != '') {
            this.doUpdate();
          } else {
            this.doCreate();
          }
        }
      });
    }
  }

  doValidate() {
    if (this.request.NAME == null || this.request.NAME == "") {
      this.showToast('warn','Cảnh báo','Họ và tên không được để trống...');
      return false;
    }

    if (this.request.PHONE_NUM == null || this.request.PHONE_NUM == "") {
      this.showToast('warn','Cảnh báo','SĐT không được để trống...');
      return false;
    }

    return true;
  }

  doCreate() {
    this.service.doCreateUser(this.request).subscribe(
      response => {
        if (response['STATE'] == 'SUCCESS') {
          this.showToast('success','Thành công','Tạo mới thành công');
        } else if(response['STATE'] == 'FAIL') {
          this.showToast('error','Lỗi','Tạo mới thất bại');
        }
      }
    )
  }

  doUpdate() {
    this.service.doUpdateUser(this.request).subscribe((response) => {
      if (response['STATE'] == 'SUCCESS') {
        this.showToast('success','Thành công','Thay đổi thành công');
      } else if(response['STATE'] == 'FAIL') {
        this.showToast('error','Lỗi','Thay đổi thất bại');
      }
    });
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }

}
