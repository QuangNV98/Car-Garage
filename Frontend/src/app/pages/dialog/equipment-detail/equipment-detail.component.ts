import { Component, OnInit } from '@angular/core';
import { EquipmentRequest } from 'app/model/equipment-request';
import { EquipmentService } from 'app/service/equipment.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {MessageService, ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  request: EquipmentRequest;
  url: any;
  file: any;
  showBtnDel: boolean = false;
  lstEquipInTrans: any[] =[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: EquipmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.file = null;
    this.lstEquipInTrans =[];
    if (this.config.data) {
      if (this.config.data.CRUD == "C") {
        //create
        this.request = new EquipmentRequest();
        this.request.PRICE = 0;
        this.url = '/assets/img/system/default-equip.png'
        this.showBtnDel = false;
      } else if (this.config.data.CRUD == "U") {
        //update
        this.showBtnDel = true;
        this.request = Object.assign(this.config.data.EQUIP);
        this.searchEquipmentById();
      }
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      // this.request.IMAGE = new FormData();
      // this.request.IMAGE.append('IMAGE',event.target.files[0])
      this.file = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
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
          }else {
            this.doCreate();
          }
        }
      });
    }
  }

  checkForDel() {
    if(this.request.ID) {
      this.service.getEquipInTransForDelEquip(this.request).subscribe(
        response => {
          if(response) {
            this.lstEquipInTrans = response;
            if(this.lstEquipInTrans.length >0) {
              this.showToast('warn','Cảnh bảo','Bạn không thể xóa vật tư này...');
            } else {
              this.doDelete();
            }
          }
        }
      )
    }
  }

  doDelete() {

    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn thực hiện thay đổi?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.deleteEquipment(this.request).subscribe(
          response => {
            if(response['STATE'] == 'SUCCESS') {
              this.showToast('success','Thành công','Xóa thành công');
              this.ref.close();
            } else {
              this.showToast('error','Lỗi','Có lỗi khi xóa');
            }
          }
        )
      }
    });

    
  }

  doCreate() {
    const formData = new FormData();
    formData.append('NAME',this.request.NAME);

    var equip = JSON.stringify(this.request);
    formData.append('equip',equip);
    formData.append('file',this.file);
    // formData.append('PRICE',this.request.PRICE);
    // formData.append('ABOUT',this.request.ABOUT);

    console.log(formData)
    this.service.doCreateEquipment(formData).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          this.showToast('success','Thành công','Tạo mới vật tư thành công');
          this.request.ID = response['ID_RETURNED'];
          this.searchEquipmentById();
        } else if(response['STATE'] == 'FAIL') {
          this.showToast('error','Lỗi','Có lỗi khi tạo mới');
        }
      }
    )
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }

  doUpdate() {
    const formData = new FormData();
    formData.append('NAME',this.request.NAME);

    var equip = JSON.stringify(this.request);
    formData.append('equip',equip);
    formData.append('file',this.file);

    this.service.doUpdateEquipment(formData).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          this.showToast('success','Thành công','Thay đổi thành công');
          this.searchEquipmentById();
        } else if(response['STATE'] == 'FAIL') {
          this.showToast('error','Lỗi','Gặp lỗi khi thay đổi');
        }
      }
    )
  }

  searchEquipmentById() {
    this.service.getEquipmentById(this.request).subscribe(
      response => {
        if(response) {
          this.request =response;
          this.url = '/assets/img/system/'+this.request.IMAGE;
        }
      }
    )
  }

  doValidate() {
    if (this.request.NAME == null || this.request.NAME == "") {
      this.showToast('warn','Cảnh bảo','Tên vật tư không được để trống......');
      return false;
    }

    if (this.request.PRICE == null || this.request.PRICE == 0) {
      this.showToast('warn','Cảnh bảo','Giá không được để trống......');
      return false;
    }

    return true;
  }

}
