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

@Component({
  selector: "app-repair-detail",
  templateUrl: "./repair-detail.component.html",
  styleUrls: ["./repair-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class RepairDetailComponent implements OnInit {
  ref_cus: DynamicDialogRef;
  ref_equip: DynamicDialogRef;
  request: TransactionRequest;
  dataGridEquip: Object[];
  id_recent: any;
  selectedStatus: any;

  status: Object[] =[
    {
      ID:1,
      Title:"Receive the vehicle"
    },
    {
      ID:2,
      Title:"Repairing, fixxing,..."
    },
    {
      ID:3,
      Title:"Completed"
    }
  ]
  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private service: TransactionService
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      if (this.config.data.CRUD == "C") {
        //create
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
        this.request.START_DT = d.getFullYear()+'-'+Number(d.getMonth()+1)+'-'+d.getDate();
        
      } else if (this.config.data.CRUD == "U") {
        //update
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
      if(this.request.ID != null && this.request.ID != '') {
        this.doUpdate();
      } else {
        this.doCreate();
      }
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
      alert("Enter ID_CUS...");
      return false;
    }

    if (this.request.CAR_NAME == null || this.request.CAR_NAME == "") {
      alert("Enter CAR_NAME...");
      return false;
    }

    if (this.request.FEE_WORK == null || this.request.FEE_WORK == "") {
      alert("Enter FEE_WORK...");
      return false;
    }

    return true;
  }

  doCreate() {
    this.request.LIST_EQUIP = this.dataGridEquip;
    this.service.doCreateTransaction(this.request).subscribe(
      response => {
        if(response) {
          alert(response['STATE']+response['ID_RETURNED'])
        }
      }
    )
  }

  doUpdate() {

  }

  onChangeStatus(event) {
    this.request.STATUS = this.selectedStatus['ID'];
  }

  openDialogCustomer() {
    this.ref_cus = this.dialogService.open(CustomerDialogComponent, {
      header: "List Customer",
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {},
    });

    this.ref_cus.onClose.subscribe((data_cus:any) => {
      this.request.ID_CUS = data_cus['ID'];
      this.request.NAME_CUS = data_cus['NAME'];
      this.request.ADDRESS_CUS = data_cus['ADDRESS'];
      this.request.PHONE_CUS = data_cus['PHONE_NUM'];
    });
  }

  openDialogEquipment() {
    this.ref_equip = this.dialogService.open(EquipmentDialogComponent, {
      header: "List Equipment",
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
    // alert(id_equip_recent)
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
}
