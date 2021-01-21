import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'app/service/equipment.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.css']
})
export class EquipmentDialogComponent implements OnInit {

  dataGridEquip: Object[] = [];
  cols: any[];

  constructor(
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    private service: EquipmentService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "IMAGE", header: "Ảnh" },
      { field: "NAME", header: "Tên" },
      { field: "PRICE", header: "Giá" },
      { field: "ABOUT", header: "Mô tả" },
    ];
    this.getListEquipment();
  }

  getListEquipment() {
    this.service.getAllEquipment().subscribe((response) => {
      if (response) {
        this.dataGridEquip = response;
      }
    });
  }

  selectedEquipment(event, rowData) {
    this.ref.close(rowData);
  }

}
