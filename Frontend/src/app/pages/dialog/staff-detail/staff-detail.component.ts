import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { StaffRequest } from "app/model/staff-request";
import { StaffService } from "app/service/staff.service";
import {MessageService, ConfirmationService} from 'primeng/api';

@Component({
  selector: "app-staff-detail",
  templateUrl: "./staff-detail.component.html",
  styleUrls: ["./staff-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class StaffDetailComponent implements OnInit {
  request: StaffRequest;
  requestLoggedIn = new StaffRequest();
  cities: City[];
  districts: District[];
  wards: Ward[];
  selectedCity: City;
  selectedDistrict: District;
  selectedWard: Ward;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: StaffService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getDataCities();
    this.getRecentUser();
    if (this.config.data) {
      if (this.config.data.CRUD == "C") {
        //create
        this.request = new StaffRequest();
        this.request.ROLE = 'ADMIN';
        this.request.COMP_NM = "Car Garage Inc.";
      } else if (this.config.data.CRUD == "U") {
        //update
        this.request = Object.assign(this.config.data.USER);
      }
    }
  }

  getRecentUser() {
    this.service.getStaffByUserName().subscribe(
      response => {
        if(response) {
          this.requestLoggedIn = response
          console.log('this.requestLoggedIn',this.requestLoggedIn);
        }
      }
    )
  }

  getSelectedCity() {
    this.selectedCity = this.cities.find((x) => x.ID == this.request.ID_CITY);
  }

  getSelectedDistrict() {
    this.selectedDistrict = this.districts.find((x) => x.ID == this.request.ID_DISTRICT);
  }

  getSelectedWard() {
    this.selectedWard = this.wards.find((x) => x.ID == this.request.ID_WARD);
  }

  getDataCities() {
    this.service.getListCities().subscribe((response) => {
      if (response) {
        this.cities = response["LtsItem"];
       
        if(this.request.ID_CITY != null && this.request.ID_CITY != '') {
          this.getSelectedCity();
          this.getDataDistricts(Number(this.request.ID_CITY));
        }
      }
    });
  }

  onChangeCity(event) {
    if (event) {
      this.getDataDistricts(event.value["ID"]);
      this.request.ID_CITY = event.value["ID"];
    }
  }

  onChangeDistrict(event) {
    if (event) {
      this.getDataWards(event.value["ID"]);
      this.request.ID_DISTRICT = event.value["ID"];
    }
  }

  onChangeWard(event) {
    if (event) {
      this.request.ID_WARD = event.value["ID"];
    }
  }

  getDataDistricts(city_id) {
    this.service.getListDistricts(city_id).subscribe((response) => {
      if (response) {
        this.districts = response;
        if(this.request.ID_DISTRICT != null && this.request.ID_DISTRICT != '') {
          this.getSelectedDistrict();
          this.getDataWards(Number(this.request.ID_DISTRICT));
        }
      }
    });
  }

  getDataWards(district_id) {
    this.service.getListWards(district_id).subscribe((response) => {
      if (response) {
        this.wards = response;
        if(this.request.ID_WARD != null && this.request.ID_WARD != '') {
          this.getSelectedWard();
        }
      }
    });
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

  doUpdate() {
    this.service.doUpdateUser(this.request).subscribe((response) => {
      if (response['STATE'] == 'SUCCESS') {
        this.showToast('success','Thành công','Lưu thay đổi thành công');
      } else if(response['STATE'] == 'FAIL') {
        this.showToast('error','Lỗi','Lưu thay đổi thất bại');
      }
    });
  }

  doCreate() {
    this.service.doCreateUser(this.request).subscribe((response) => {
      if (response['STATE'] == 'SUCCESS') {
        this.showToast('success','Thành công','Tạo mới thành công');
      } else if(response['STATE'] == 'FAIL') {
        this.showToast('error','Lỗi','Tạo mới thất bại');
      }
    });
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }

  doValidate() {
    if (this.request.NAME == null || this.request.NAME == "") {
      this.showToast('warn','Cảnh báo','Họ và tên không được để trống...');
      return false;
    }

    if (this.request.USERNAME == null || this.request.USERNAME == "") {
      this.showToast('warn','Cảnh báo','Tên đăng nhập không được để trống...');
      return false;
    }

    if ((this.request.PASSWORD == null || this.request.PASSWORD == "") && (this.request.ID == null || this.request.ID =='')) {
      this.showToast('warn','Cảnh báo','Mật khẩu không được để trống...');
      return false;
    }

    if (this.request.PHONE_NUM == null || this.request.PHONE_NUM == "") {
      this.showToast('warn','Cảnh báo','SĐT không được để trống...');
      return false;
    }

    if (this.request.ID_NUM == null || this.request.ID_NUM == "") {
      this.showToast('warn','Cảnh báo','Số CMT/căn cước không được để trống...');
      return false;
    }

    if (this.request.ID_CITY == null || this.request.ID_CITY == "") {
      this.showToast('warn','Cảnh báo','Tỉnh thành không được để trống...');
      return false;
    }

    if (this.request.ID_DISTRICT == null || this.request.ID_DISTRICT == "") {
      this.showToast('warn','Cảnh báo','Quận/huyện không được để trống...');
      return false;
    }

    if (this.request.ID_WARD == null || this.request.ID_WARD == "") {
      this.showToast('warn','Cảnh báo','Phường/xã không được để trống...');
      return false;
    }
    return true;
  }
}

interface City {
  Title: string;
  ID: string;
}

interface District {
  Title: string;
  ID: string;
}

interface Ward {
  Title: string;
  ID: string;
}
