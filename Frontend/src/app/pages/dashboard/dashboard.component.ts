import { Cookie } from 'ng2-cookies';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import {MessageService} from 'primeng/api';
import { StaffService } from 'app/service/staff.service';
import { StaffRequest } from 'app/model/staff-request';

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  
  webSocketEndPoint: any = "http://localhost:8080/ws";
  topic: any = "/topic/greetings";
  stompClient: any;
  request: Object = null;
  requestUser : StaffRequest;

  images: Object[]=[
    {
      source: "banner-1.jpg",
      name: "Banner-1"
    },
    {
      source: "banner-3.jpg",
      name: "Banner-3"
    },
  ];
  today: Date

  constructor(
    private messageService: MessageService,
    private service_staff: StaffService
  ) {}

  ngOnInit() {
    this.connect();

    this.getRecentUser();
  }

  getRecentUser() {
    this.service_staff.getStaffByUserName().subscribe(
      response => {
        if(response) {
          this.requestUser = response
        }
      }
    )
  }

  connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    console.log('this.stompClient',this.stompClient)
    const _this = this;
    _this.stompClient.connect(
      {},
      function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
      },
      // this.errorCallBack
    );
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
  onMessageReceived(message) {
    console.log("Message Recieved from Server :: ");
    if(message.body) {
      // this.showToast('info','Notification','Have a rescue from customer');
      alert('Have a rescue from customer')
    }
    
    // this.appComponent.handleMessage(JSON.stringify(message.body));
  }

  showToast(sev,sum,det) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Update successfully'});
    this.messageService.add({severity:sev, summary: sum, detail: det});
  }
}
