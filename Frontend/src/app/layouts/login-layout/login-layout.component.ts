import { Component, OnInit } from "@angular/core";
import { AccountInfo } from "app/model/account-info";
import { AppService } from "app/service/app.service";
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";
import { MessageService } from 'primeng/api';

@Component({
  selector: "app-login-layout",
  templateUrl: "./login-layout.component.html",
  styleUrls: ["./login-layout.component.css"],
})
export class LoginLayoutComponent implements OnInit {
  accountInfo: AccountInfo;

  constructor(private appService: AppService, private router: Router,private messageService: MessageService,) {}

  ngOnInit(): void {
    if (this.appService.isLoggedIn()) {
      this.router.navigate(["/admin"]);
    } else {
      this.accountInfo = new AccountInfo();
    }
  }

  login() {
    if (this.doValidate()) {
      this.appService.login(this.accountInfo).subscribe(
        (response) => {
          console.log('response login: ',response);
          if (
            !isNullOrUndefined(response) &&
            !isNullOrUndefined(response.body)
          ) {
            this.appService.saveToken(response.body,this.accountInfo.username);
          }
        },
        (error) => {
          console.log("err", error);
          this.showToast('error','Lỗi','Đăng nhập thất bại, xin mời nhập lại!');
        }
      );
    }
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }

  doValidate() {
    if (this.accountInfo.username == null || this.accountInfo.username == "") {
      this.showToast('warn','Cảnh bảo','Tên đăng nhập không được để trống...');
      return false;
    }

    if (this.accountInfo.password == null || this.accountInfo.password == "") {
      this.showToast('warn','Cảnh bảo','Mật khẩu không được để trống...');
      return false;
    }

    return true;
  }
}
