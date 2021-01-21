import { GuaranteeService } from 'app/service/guarantee.service';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { RepairDetailComponent } from '../dialog/repair-detail/repair-detail.component';
import { GuaranteeDetailComponent } from '../dialog/guarantee-detail/guarantee-detail.component';

@Component({
	selector: 'app-task-planning',
	templateUrl: './task-planning.component.html',
	styleUrls: ['./task-planning.component.css']
})
export class TaskPlanningComponent implements OnInit {

	cols: any[];
	cols_guarantee: any[];
	ref: DynamicDialogRef;
	ref_guarantee: DynamicDialogRef;
	dataGridRepairing: Object[] = [];
	dataGridGuarantee: Object[] = [];
	dataGridCompleted: Object[] = [];

	constructor(
		public dialogService: DialogService,
		public messageService: MessageService,
		private service: TransactionService,
		private service_guar: GuaranteeService
	) { }

	ngOnInit(): void {
		this.cols = [
			{ field: 'NAME_CUS', header: 'Khách hàng' },
			{ field: 'PHONE_CUS', header: 'SĐT' },
			{ field: 'CAR_NAME', header: 'Phương tiện' },
			{ field: 'CAR_NUM', header: 'Biển số xe' },
			{ field: 'START_DT', header: 'Ngày tiếp nhận' }
		];
		this.cols_guarantee = [
			{ field: 'NAME', header: 'Khách hàng' },
			{ field: 'PHONE_NUM', header: 'SĐT' },
			{ field: 'CAR_NAME', header: 'Phương tiện' },
			{ field: 'CAR_NUM', header: 'Biển số xe' },
			{ field: 'START_DT', header: 'Ngày tiếp nhận' }
		];
		this.getAllTransRepairing();
		this.getAllGuaranted();
		this.getAllTransCompleted();
	}

	getAllTransRepairing() {
		this.service.getAllTransRepairing().subscribe(
			response => {
				if (response) {
					this.dataGridRepairing = response;
				}
			}
		)
	}

	getAllGuaranted() {
		this.service_guar.getAllGuarantee().subscribe(
			response => {
				if (response) {
					this.dataGridGuarantee = response;
					console.log(this.dataGridGuarantee)
				}
			}
		)
	}

	getAllTransCompleted() {
		this.service.getAllTransCompleted().subscribe(
			response => {
				if (response) {
					this.dataGridCompleted = response;
				}
			}
		)
	}

	selectedRepairing(event, rowData, status: any) {
		this.ref = this.dialogService.open(RepairDetailComponent, {
			header: status == null ? 'Đơn hàng sửa chữa' : 'Đơn hàng đã hoàn thành',
			width: '70%',
			contentStyle: { "max-height": "1000px", "overflow": "auto" },
			baseZIndex: 10000,
			data: {
				CRUD: rowData == null ? "C" : "U",
				TRANS_ID: rowData != null ? rowData['ID_TRANS'] : '',
				STATUS: status
			}
		});

		this.ref.onClose.subscribe(() => {
			this.getAllTransRepairing();
			this.getAllTransCompleted();
			this.getAllGuaranted();
		});
	}

	selectedGuaranted(event, rowData) {
		this.ref_guarantee = this.dialogService.open(GuaranteeDetailComponent, {
			header: 'Thông tin bảo hành',
			width: '70%',
			contentStyle: { "max-height": "1000px", "overflow": "auto" },
			baseZIndex: 10000,
			data: {
				ID_GUARANTEE: rowData != null ? rowData['ID'] : '',
				STATUS: rowData != null ? rowData['STATUS'] : '',
			}
		});

		this.ref_guarantee.onClose.subscribe(() => {
			this.getAllTransCompleted();
			this.getAllGuaranted();
		});
	}

}
