import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/service/app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private appService: AppService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!Cookie.check('ACCESS_TOKEN')) {
      this.router.navigate(['/login']);
    }
   }

}
