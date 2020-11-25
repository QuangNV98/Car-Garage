import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StaffRequest } from 'app/model/staff-request';
import { StaffService } from 'app/service/staff.service';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StaffDetailComponent implements OnInit {

  request : StaffRequest;
  cities: City[];
  districts: District[];
  wards: Ward[];

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private service: StaffService
  ) { }

  ngOnInit(): void {
    this.getDataCities();
    if(this.config.data) {
      if(this.config.data.CRUD == 'C') {
        //create 
        this.request = new StaffRequest();
        this.request.COMP_NM ='Car Garage Inc.';
      }else {
        //update
      }
    }
  }

  getDataCities() {
    this.service.getListCities().subscribe(
      response => {
        if(response) {
          this.cities = response['LtsItem'];
        }
      }
    )
  }

  onChangeCity(event) {
    if(event) {
      this.getDataDistricts(event.value['ID']);
      this.request.CITY_ID = event.value['ID']
    }
  }

  onChangeDistrict(event) {
    if(event) {
      this.getDataWards(event.value['ID']);
      this.request.DISTRICT_ID = event.value['ID'];
    }
  }

  onChangeWard(event) {
    if(event) {
      this.request.WARD_ID = event.value['ID'];
    }
  }

  getDataDistricts(city_id) {
    this.service.getListDistricts(city_id).subscribe(
      response => {
        if(response) {
          this.districts = response;
        }
      }
    )
  }

  getDataWards(district_id) {
    this.service.getListWards(district_id).subscribe(
      response => {
        if(response) {
          this.wards = response;
        }
      }
    )
  }

  doSubmit() {
    console.log('this.req', this.request);
    this.service.doSaveStaff(this.request).subscribe(
      response => {
        if(response) {
          console.log(response);
        }
      }
    )
  }

}

interface City {
  Title: string,
  ID: string
}

interface District {
  Title: string,
  ID: string
}

interface Ward {
  Title: string,
  ID: string
}

