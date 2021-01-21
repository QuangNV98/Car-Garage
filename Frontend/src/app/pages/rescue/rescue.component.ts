import { Component, OnInit } from "@angular/core";
import { RescueService } from 'app/service/rescue.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: "app-rescue",
  templateUrl: "./rescue.component.html",
  styleUrls: ["./rescue.component.css"],
})
export class RescueComponent implements OnInit {
  
  origin: any;
  destination: any;
  lat : 20.9935472;
  lng : 105.8017533;

  dataGridRescue: Object[] = [];

  cols: any[];
  ref: DynamicDialogRef;

  markers: marker[]=[
    {
      lat : 20.9935472,
      lng : 105.8017533,
      label: 'Garage',
      draggable: false
    }
  ];

  constructor(
    private service: RescueService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // this.markers = [
    //   {
    //     lat : 21.0316344,
    //     lng : 105.8511364,
    //     label: 'Customer',
    //     draggable: false
    //   }
    // ]
    this.getListRescue();
  }

  getListRescue() {
    this.service.getAllRescue().subscribe((response) => {
      if (response) {
        this.dataGridRescue = response;
        console.log(this.dataGridRescue)
      }
    });
  }

  doUpdateState(rowData) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn thực hiện thay đổi?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.doUpdateState(rowData).subscribe(
          response => {
            if(response['STATE'] == 'SUCCESS') {
              alert(response['STATE'])
              this.getListRescue();
            }
          }
        )
      }
    }); 
  }

  doIgnore(rowData) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn thực hiện thay đổi?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.doIgnore(rowData).subscribe(
          response => {
            if(response['STATE'] == 'SUCCESS') {
              alert(response['STATE'])
              this.getListRescue();
            }
          }
        )
      }
    });
  }

  selectedResuce(event, rowData) {
    this.markers=[
      {
        lat : 20.9935472,
        lng : 105.8017533,
        label: 'Garage',
        draggable: false
      },
      {
        lat : rowData['LAT'],
        lng : rowData['LNG'],
        label: 'S.O.S',
        draggable: false
      }
    ];
    console.log(this.markers)
    // let obj_rescue: marker;
    // console.log(rowData)
    // obj_rescue.lat = rowData['LAT']
    // obj_rescue.lng = rowData['LNG']
    // obj_rescue.label = 'S.O.S'
    // obj_rescue.draggable = false;
    // console.log(obj_rescue)
    // this.markers.push(obj_rescue);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
