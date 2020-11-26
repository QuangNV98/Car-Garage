import { Component, OnInit } from '@angular/core';
import { EquipmentRequest } from 'app/model/equipment-request';
import { EquipmentService } from 'app/service/equipment.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  request: EquipmentRequest;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: EquipmentService
  ) { }

  ngOnInit(): void {
    if (this.config.data) {
      if (this.config.data.CRUD == "C") {
        //create
        this.request = new EquipmentRequest();
        this.request.PRICE = 0;
      } else if (this.config.data.CRUD == "U") {
        //update
        this.request = Object.assign(this.config.data.EQUIP);
        this.searchEquipmentById();
      }
    }
  }

  doSubmit() {
    if (this.doValidate()) {
      if(this.request.ID != null && this.request.ID != '') {
        this.doUpdate();
      }else {
        this.doCreate();
      }
    }
  }

  doCreate() {
    this.service.doCreateEquipment(this.request).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          this.request.ID = response['ID_RETURNED'];
          this.searchEquipmentById();
        }
      }
    )
  }

  doUpdate() {
    this.service.doUpdateEquipment(this.request).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          alert('update success');
          this.searchEquipmentById();
        }
      }
    )
  }

  searchEquipmentById() {
    this.service.getEquipmentById(this.request).subscribe(
      response => {
        if(response) {
          this.request =response;
        }
      }
    )
  }

  doValidate() {
    if (this.request.NAME == null || this.request.NAME == "") {
      alert("Enter equipment name...");
      return false;
    }

    if (this.request.PRICE == null || this.request.PRICE == 0) {
      alert("Enter price...");
      return false;
    }

    return true;
  }

}
