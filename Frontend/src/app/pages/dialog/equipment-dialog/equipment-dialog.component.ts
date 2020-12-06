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
      { field: "IMAGE", header: "Image" },
      { field: "NAME", header: "Name" },
      { field: "PRICE", header: "Price" },
      { field: "ABOUT", header: "About" },
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
