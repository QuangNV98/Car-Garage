import { Component, OnInit } from "@angular/core";
import { EquipmentService } from "app/service/equipment.service";
import { MessageService } from "primeng/api";
import { DynamicDialogRef, DialogService } from "primeng/dynamicdialog";
import { EquipmentDetailComponent } from "../dialog/equipment-detail/equipment-detail.component";

@Component({
  selector: "app-equipment-management",
  templateUrl: "./equipment-management.component.html",
  styleUrls: ["./equipment-management.component.css"],
})
export class EquipmentManagementComponent implements OnInit {
  dataGridEquip: Object[] = [];

  cols: any[];
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private service: EquipmentService
  ) {}

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
    this.ref = this.dialogService.open(EquipmentDetailComponent, {
      header: "Equipment Information",
      width: "50%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {
        CRUD: rowData == null ? "C" : "U",
        EQUIP: rowData ? rowData : null,
      },
    });

    this.ref.onClose.subscribe(() => {
		this.getListEquipment();
	});
  }
}
