import { Component, OnInit } from '@angular/core';
import { AccountInfo } from 'app/model/account-info';
import { AppService } from 'app/service/app.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {

  accountInfo: AccountInfo;

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.accountInfo = new AccountInfo();
  }

  login() {
    console.log(this.accountInfo.username, this.accountInfo.password);
    this.appService.login(this.accountInfo).subscribe(
      response => {
        console.log('res',response);
      },
      error => {
        console.log('err',error);
      }
    );
  }

}
