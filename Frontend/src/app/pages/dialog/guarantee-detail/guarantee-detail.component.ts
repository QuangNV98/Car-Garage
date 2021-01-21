import { GuaranteeService } from './../../../service/guarantee.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GuarantedDetailRequest } from 'app/model/guarantee-request';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-guarantee-detail',
  templateUrl: './guarantee-detail.component.html',
  styleUrls: ['./guarantee-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GuaranteeDetailComponent implements OnInit {

  request = new GuarantedDetailRequest();
  selectedStatus: any;
  isOnlyView: boolean = false;

  status: Object[] =[
    {
      ID:1,
      Title:"Tiếp nhận"
    },
    {
      ID:2,
      Title:"Đang tiến hành"
    },
    {
      ID:3,
      Title:"Hoàn thành"
    }
  ]

  constructor(
    public config: DynamicDialogConfig,
    private service: GuaranteeService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    if(this.config.data) {
      this.request.ID = this.config.data.ID_GUARANTEE;
      if(this.config.data.STATUS == 3) {
        //completed guaranted, just only view
        this.isOnlyView = true;
      }
      this.getGuarantedById();
    }
  }

  getGuarantedById() {
    this.service.getGuarantedById(this.request).subscribe(
      response => {
        if(response) {
          this.request = response;
          var lstStatus = this.status.filter(
            (item,index) => {
              return item['ID'] == response['STATUS']
            }
          )
          this.selectedStatus = lstStatus? lstStatus[0] : null;
        }
      }
    )
  }

  onChangeStatus(event) {
    this.request.STATUS = this.selectedStatus['ID'];
  }

  doSubmit() {
    if (this.doValidate()) {
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn muốn thực hiện thay đổi?',
        header: 'Xác nhận',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.service.doUpdateGuarantee(this.request).subscribe(
            response => {
              if(response['STATE'] == 'SUCCESS') {
                this.showToast('success','Thành công','Thay đổi thành công');
                this.getGuarantedById();
              } else if(response['STATE'] == 'FAIL') {
                this.showToast('error','Lỗi','Có lỗi khi thay đổi');
              }
            }
          )
        }
      });   
    }
  }

  doDelete() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn thực hiện thay đổi?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.deleteGuarantedById(this.request).subscribe(
          response => {
            if(response['STATE'] == 'SUCCESS') {
              this.showToast('success','Thành công','Xoá thành công');
              this.ref.close();
            } else if(response['STATE'] == 'FAIL') {
              this.showToast('error','Lỗi','Có lỗi khi Xóa');
            }
          }
        )
      }
    });
  }

  doValidate() {
    if (this.request.END_DT == null || this.request.END_DT == "") {
      this.showToast('warn','Cảnh bảo','Ngày bàn giao không được để trống');
      return false;
    }

    return true;
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }

}
