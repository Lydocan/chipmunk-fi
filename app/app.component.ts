import { Component, OnInit, OnDestroy } from "@angular/core";
import * as connectivity from "connectivity";
import { android as androidApp, ios as iosApp } from "application";
import { AuthService } from "~/shared/auth.service";
import { stringify } from "@angular/core/src/util";
declare var android: any

@Component({
  selector: "my-app",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public connectionType: string;
  private appContext: any;
  private jsonStr: string;
  private isOnline: boolean;
  private responseMsg: string;
  private userId: string;
  private mac: string;
  private ip: string;


  constructor(private authService: AuthService) {
    this.isOnline = false;

    // >> connectivity-gettype-code
    let connectionType = connectivity.getConnectionType();
    switch (connectionType) {
      case connectivity.connectionType.none:
        this.connectionType = "None";
        break;
      case connectivity.connectionType.wifi:
        this.connectionType = "Wi-Fi";
        break;
      case connectivity.connectionType.mobile:
        this.connectionType = "Mobile";
        break;
      default:
        break;
    }
    // << connectivity-gettype-code

    if (androidApp) {
      console.log("We are running on Android device!");
      this.appContext = androidApp.context;

      var wifiManager = this.appContext.getSystemService(android.content.Context.WIFI_SERVICE);
      var wInfo = wifiManager.getConnectionInfo();
      console.log(wInfo);
      var mac = wInfo.getMacAddress();
      this.mac = mac;
      var ip = android.text.format.Formatter.formatIpAddress(wInfo.getIpAddress());
      this.ip = ip;
      console.log("mac: " + mac + " ip: " + ip);
    }
  }

  ngOnInit(): void {
    // >> connectivity-start-code
    connectivity.startMonitoring((newConnectionType: number) => {
      switch (newConnectionType) {
        case connectivity.connectionType.none:
          this.connectionType = "None";
          console.log("Connection type changed to none.");
          break;
        case connectivity.connectionType.wifi:
          this.connectionType = "Wi-Fi";
          console.log("Connection type changed to WiFi.");
          break;
        case connectivity.connectionType.mobile:
          this.connectionType = "Mobile";
          console.log("Connection type changed to mobile.");
          break;
        default:
          break;
      }
    });
    // << connectivity-start-code
  }

  ngOnDestroy() {
    connectivity.stopMonitoring();
  }

  login() {
    var body = {
      "baseInfo": {
        "deviceCode": "359648080125456",
        "platform": 1,
        "sign": "6723A3DA72281F435DDA0D87393CDDE4",
        "userId": this.userId,
        "versionCode": 220
      },
      "mobile": "6LgUVQO2NJaOtmQie+e2pw\u003d\u003d",
      "safetyCode": "e10adc3949ba59abbe56e057f20f883e",
      "type": "2"
    };
    if (this.jsonStr) {
      body = JSON.parse(this.jsonStr);
    }
    console.log("Sending data: " + JSON.stringify(body));
    this.authService.login(body).subscribe(response => {
      console.log("response: " + JSON.stringify(response));
      this.responseMsg = JSON.stringify(response);
    });
  }

  auth() {
    var body = {
      "BaseInfo": {
        "deviceCode": "359648080125456",
        "mobile": this.userId,
        "cityName": "广州",
        "lineCode": "1507",
        "ip": this.ip,
        "mac": this.mac,
        "plantform": 1,
        "versionCode": 220,
        "channelCode": "",
        "createTime": 1527817366540,
        "eventKey": "openNet"
      },
      "Expand": {
        "resultCode": "",
        "resultMsg": ""
      }
    };

    if (this.jsonStr) {
      body = JSON.parse(this.jsonStr);
    }
    console.log("Sending data: " + JSON.stringify(body));
    this.authService.auth(body).subscribe(response => {
      console.log("response: " + JSON.stringify(response));
      this.responseMsg = JSON.stringify(response);
    });
  }

  checkOnline() {

  }
}
