import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  // webSocketAPI = new WebSocketAPI();

  webSocketEndPoint: string = "http://localhost:8080/ws";
  topic: string = "/topic/greetings";
  stompClient: any;

  greeting: any;

  constructor(private router: Router) {} 

  ngOnInit() {
    console.log('alo1')
    if (!Cookie.check("ACCESS_TOKEN")) {
      this.router.navigate(["/login"]);
    }
    console.log(Cookie.get("ACCESS_TOKEN"))
    // this.webSocketAPI = new WebSocketAPI(new AdminLayoutComponent(null));
    // this.webSocketAPI = new WebSocketAPI();
    // this.connect();
  }

  // connect() {
  //   // this.webSocketAPI._connect();
  //   console.log("Initialize WebSocket Connection");
  //   let ws = new SockJS(this.webSocketEndPoint);
  //   this.stompClient = Stomp.over(ws);
  //   const _this = this;
  //   _this.stompClient.connect(
  //     {},
  //     function (frame) {
  //       _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
  //         _this.onMessageReceived(sdkEvent);
  //       });
  //       //_this.stompClient.reconnect_delay = 2000;
  //     },
  //     this.errorCallBack
  //   );
  // }

  // errorCallBack(error) {
  //   console.log("errorCallBack -> " + error);
  //   setTimeout(() => {
  //     this.connect();
  //   }, 5000);
  // }
  // onMessageReceived(message) {
  //   console.log("Message Recieved from Server :: " + message);
  //   console.log("alooooo");
  //   // this.appComponent.handleMessage(JSON.stringify(message.body));
  // }

  // disconnect() {
  //   this.webSocketAPI._disconnect();
  // }

  // sendMessage() {
  //   this.webSocketAPI._send("alo");
  // }

  // handleMessage(message) {
  //   this.greeting = message;
  // }
}
