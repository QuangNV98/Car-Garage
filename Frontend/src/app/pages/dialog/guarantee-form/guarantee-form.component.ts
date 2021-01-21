import { GuaranteeRequest } from './../../../model/guarantee-request';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GuaranteeService } from 'app/service/guarantee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.css']
})
export class GuaranteeFormComponent implements OnInit {

  request = new GuaranteeRequest();

  constructor(
    public config: DynamicDialogConfig,
    private service: GuaranteeService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    var d = new Date();
    this.request.START_DT = d.getFullYear()+'-'+Number(d.getMonth()+1)+'-'+d.getDate();
    this.request.ID_TRANS = this.config.data.ID_TRANS;
  }

  doSubmit() {
    if(this.doValidate()) {
      this.service.doCreateGuarantee(this.request).subscribe(
        response => {
          if(response['STATE'] == 'SUCCESS') {
            this.showToast('success','Thành công','Tạo mới thành công');
            this.ref.close('SUCCESS');
          } else if(response['STATE'] == 'FAIL') {
            this.showToast('error','Lỗi','Có lỗi khi tạo mới');
          }
        }
      )
    }
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
