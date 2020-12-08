import { Component, OnInit } from "@angular/core";
import { AccountInfo } from "app/model/account-info";
import { AppService } from "app/service/app.service";
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-login-layout",
  templateUrl: "./login-layout.component.html",
  styleUrls: ["./login-layout.component.css"],
})
export class LoginLayoutComponent implements OnInit {
  accountInfo: AccountInfo;

  constructor(private appService: AppService, private router: Router) {}

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
          if (
            !isNullOrUndefined(response) &&
            !isNullOrUndefined(response.body)
          ) {
            this.appService.saveToken(response.body);
          }
        },
        (error) => {
          console.log("err", error);
        }
      );
    }
  }

  doValidate() {
    if (this.accountInfo.username == null || this.accountInfo.username == "") {
      alert("Enter username...");
      return false;
    }

    if (this.accountInfo.password == null || this.accountInfo.password == "") {
      alert("Enter pass...");
      return false;
    }

    return true;
  }
}
