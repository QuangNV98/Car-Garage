import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { RepairDetailComponent } from '../dialog/repair-detail/repair-detail.component';

@Component({
  selector: 'app-task-planning',
  templateUrl: './task-planning.component.html',
  styleUrls: ['./task-planning.component.css']
})
export class TaskPlanningComponent implements OnInit {

  cols: any[];
  ref: DynamicDialogRef;
  dataGridRepairing: Object[] =[];
  
  constructor(
	public dialogService: DialogService,
	public messageService: MessageService,
	private service: TransactionService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'NAME_CUS', header: 'Customer' },
      { field: 'PHONE_CUS', header: 'Phonenumber' },
      { field: 'CAR_NAME', header: 'Vehicle' },
	  { field: 'CAR_NUM', header: 'License plates' },
	  { field: 'START_DT', header: 'License plates' }
  ];
  	this.getAllTransRepairing();
  }

  getAllTransRepairing() {
	  this.service.getAllTransRepairing().subscribe(
		  response => {
			  if(response) {
				this.dataGridRepairing = response;
				console.log(this.dataGridRepairing);
			  }
		  }
	  )
  }

  selectedRepairing(event, rowData) {
	this.ref = this.dialogService.open(RepairDetailComponent, {
		header: 'Repair Order',
		width: '70%',
		contentStyle: {"max-height": "1000px", "overflow": "auto"},
		baseZIndex: 10000,
		data: {
			CRUD: rowData == null ? "C" : "U",
			TRANS: rowData ? rowData : null,
		}
	});

	this.ref.onClose.subscribe(() =>{
		
	});
  }

  selectedCustomer(event, rowData) {

  }

}
