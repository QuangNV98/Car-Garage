import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TransactionRequest } from 'app/model/transaction-request';
import { TransactionService } from 'app/service/transaction.service';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { CustomerDialogComponent } from "../customer-dialog/customer-dialog.component";
import { EquipmentDialogComponent } from "../equipment-dialog/equipment-dialog.component";
import { GuaranteeFormComponent } from '../guarantee-form/guarantee-form.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GuaranteeService } from 'app/service/guarantee.service';

@Component({
  selector: "app-repair-detail",
  templateUrl: "./repair-detail.component.html",
  styleUrls: ["./repair-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class RepairDetailComponent implements OnInit {

  ref_gurantee: DynamicDialogRef;
  ref_cus: DynamicDialogRef;
  ref_equip: DynamicDialogRef;
  request: TransactionRequest;
  dataGridEquip: Object[];
  lstIsGuaranted: Object[]=[];
  isCheckGuaranted: boolean = false;
  id_recent: any;
  selectedStatus: any;

  isOnlyView: boolean = false;
  isDisableChooseUser: boolean = false;

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
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private service: TransactionService,
    public ref_main: DynamicDialogRef,
    private messageService: MessageService,
    private service_guarantee : GuaranteeService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      if (this.config.data.CRUD == "C") {
        //create
        this.isDisableChooseUser = false;
        this.request = new TransactionRequest();
        this.dataGridEquip = [];
        this.id_recent = 0;
        this.request.FEE_EQUIP = 0;
        this.request.FEE_WORK = 0;
        this.request.FEE_TOTAL = 0;
        this.request.TYPE = 1;
        this.request.STATUS = 1;
        this.selectedStatus = this.status[0];
        
        var d = new Date();
        // debugger;
        let month = (d.getMonth()+1).toString();
        month = (month.length == 1) ? '0'+month : month;
        this.request.START_DT = d.getFullYear()+'-'+month+'-'+d.getDate();    
        
      } else if (this.config.data.CRUD == "U") {
        // transaction is completed. set only view
        if(this.config.data.STATUS == 3) {
          this.isOnlyView = true;
        }
        //update
        this.isDisableChooseUser = true;
        this.id_recent = 0;
        this.request = new TransactionRequest();
        this.request.ID = this.config.data.TRANS_ID;
        this.getTransactionById();
        this.getListTransEquipment();
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

  getTransactionById() {
    this.service.getTransRepairingById(this.request).subscribe(
      response => {
        if(response) {
          this.request = response;
          var lstStatus = this.status.filter(
            (item,index) => {
              return item['ID'] == response['STATUS']
            }
          )
          this.selectedStatus = lstStatus? lstStatus[0] : null;
          this.getListIsGuaranted();
        }
      }
    )
  }

  getListIsGuaranted() {
    this.service_guarantee.getListIsGuaranted(this.request).subscribe(
      response => {
        if(response) {
          this.lstIsGuaranted = response;
          if(this.lstIsGuaranted.length >0) {
            this.isCheckGuaranted = true;
          }else {
            this.isCheckGuaranted = false;
          }
        }
      }
    )
  }

  getListTransEquipment() {
    this.service.getListTransEquip(this.request).subscribe(
      response => {
        if(response) {
          this.dataGridEquip = response;
          if(this.dataGridEquip.length >0) {
            this.dataGridEquip.forEach((item, index) => {
                this.id_recent++
                item['ID_RECENT'] = this.id_recent
            })
          }
          console.log('this.dataGridEquip',this.dataGridEquip)
        }
      }
    )
  }

  doValidate() {
    if (this.request.ID_CUS == null || this.request.ID_CUS == "") {
      this.showToast('warn','Cảnh bảo','Khách hàng không được để trống...');
      return false;
    }

    if (this.request.CAR_NAME == null || this.request.CAR_NAME == "") {
      this.showToast('warn','Cảnh bảo','Tên xe không được để trống...');
      return false;
    }

    if (this.request.CAR_NUM == null || this.request.CAR_NUM == "") {
      this.showToast('warn','Cảnh bảo','Biển số xe không được để trống...');
      return false;
    }

    if (this.request.END_DT == null || this.request.END_DT == "") {
      this.showToast('warn','Cảnh báo','Ngày bàn giao không được để trống...');
      return false;
    }

    if (this.request.FEE_WORK == null || this.request.FEE_WORK == "") {
      this.showToast('warn','Cảnh báo','Tiền công không được để trống...');
      return false;
    }

    return true;
  }

  doCreate() {
    this.request.LIST_EQUIP = this.dataGridEquip;
    this.service.doCreateTransaction(this.request).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          this.showToast('success','Thành công','Tạo mới thành công');
          this.request.ID = response['ID_RETURNED'];
          // this.getTransactionById();
          // this.getListTransEquipment();
        } else if(response['STATE'] == 'FAIL') {
          this.showToast('error','Lỗi','Có lỗi khi tạo mới');
        }
      }
    )
  }

  doUpdate() {
    this.request.LIST_EQUIP = this.dataGridEquip;
    this.service.doUpdateTransaction(this.request).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          this.showToast('success','Thành công','Thay đổi thành công');
          // this.getTransactionById();
          // this.getListTransEquipment();
        } else if(response['STATE'] == 'FAIL') {
          this.showToast('error','Error','Có lỗi khi thay đổi');
        }
      }
    )
  }

  onChangeStatus(event) {
    this.request.STATUS = this.selectedStatus['ID'];
  }

  openDialogCustomer() {
    if(this.isOnlyView == false && this.isDisableChooseUser == false) {
      this.ref_cus = this.dialogService.open(CustomerDialogComponent, {
        header: "Danh sách khách hàng",
        width: "50%",
        contentStyle: { "max-height": "500px", overflow: "auto" },
        baseZIndex: 10000,
        data: {},
      });
    }

    this.ref_cus.onClose.subscribe((data_cus:any) => {
      this.request.ID_CUS = data_cus['ID'];
      this.request.NAME_CUS = data_cus['NAME'];
      this.request.ADDRESS_CUS = data_cus['ADDRESS'];
      this.request.PHONE_CUS = data_cus['PHONE_NUM'];
    });
  }

  openDialogEquipment() {
    this.ref_equip = this.dialogService.open(EquipmentDialogComponent, {
      header: "Danh sách vật tư",
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {},
    });

    this.ref_equip.onClose.subscribe((data_equip:any) => {
      if(data_equip != null && this.checkDuplicateEquip(data_equip)) {
        this.id_recent++;
        data_equip['ID_RECENT'] = this.id_recent;
        data_equip['QUANTITY_EQUIP'] = 1;
        data_equip['PRICE_TOTAL'] = data_equip['PRICE'];
        this.dataGridEquip.push(data_equip);
        this.doCaculateFreeOfEquip();
      }
    });
  }

  checkDuplicateEquip(data_equip) {
    for(let i=0;i<this.dataGridEquip.length;i++) {
      if(this.dataGridEquip[i]['ID'] == data_equip['ID']) {
        return false;
      }
    }
    return true;
  }

  doChangeQuantity(event,id_equip_recent ) {
    const quantity_val = event.target.value;
    this.dataGridEquip.forEach((item,index) => {
      if(item['ID_RECENT'] == id_equip_recent) {
        item['PRICE_TOTAL'] = Number(item['PRICE']) * quantity_val;
        item['QUANTITY_EQUIP'] = event.target.value;
      }
    })
    this.doCaculateFreeOfEquip();
  }

  deleteEquipRecent(id_equip_recent) {
    var removeIndex = this.dataGridEquip.map(
      function(item) { 
        return item['ID_RECENT']; 
      }
    ).indexOf(id_equip_recent);
    this.dataGridEquip.splice(removeIndex, 1);

    this.doCaculateFreeOfEquip();
  }

  doCaculateFreeOfEquip() {
    this.request.FEE_EQUIP = 0;
    this.dataGridEquip.forEach((item, index) => {
      this.request.FEE_EQUIP += item['PRICE_TOTAL'];
    })
    this.doCacualteFeeTotal();
  }

  doChangeFeeOfWork(event) {
    this.doCacualteFeeTotal();
  }

  doCacualteFeeTotal() {
    this.request.FEE_TOTAL = this.request.FEE_EQUIP + this.request.FEE_WORK;
  }

  doGuarantee() {
    if(this.request.IS_GUARANTEE == 1 && this.isCheckGuaranted) {
      this.showToast('warn','Cảnh bảo','Đơn hàng này đang được bảo hành!');
    } else {
      this.ref_gurantee = this.dialogService.open(GuaranteeFormComponent, {
        header: 'Thông tin bảo hành',
        width: '40%',
        contentStyle: {"max-height": "1000px", "overflow": "auto"},
        baseZIndex: 10000,
        data: {
          ID_TRANS: this.request.ID
        }
      });
    }
    this.ref_gurantee.onClose.subscribe((res) =>{
      if(res == 'SUCCESS') {
        this.ref_main.close();
      }
    });
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }
}
