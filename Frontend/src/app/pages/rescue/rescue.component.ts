import { Component, OnInit } from "@angular/core";
import { RescueService } from 'app/service/rescue.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: "app-rescue",
  templateUrl: "./rescue.component.html",
  styleUrls: ["./rescue.component.css"],
})
export class RescueComponent implements OnInit {
  
  origin: any;
  destination: any;

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
    private service: RescueService
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
    this.service.doUpdateState(rowData).subscribe(
      response => {
        if(response['STATE'] == 'SUCCESS') {
          alert(response['STATE'])
          this.getListRescue();
        }
      }
    )
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
