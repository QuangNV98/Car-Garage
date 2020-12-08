import { Component, OnInit } from "@angular/core";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  
  webSocketEndPoint: any = "http://localhost:8080/ws";
  topic: any = "/topic/greetings";
  stompClient: any;

  constructor() {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
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
      alert('Have a recue from customer')
    }
    
    // this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
