import { Component, OnInit } from '@angular/core';
import { ApiStatusService } from './api-status.service'
import { ApiStatusInfo, Api_Status } from './shared/ApiStatusInfo.model'
import { Chart } from 'chart.js';
import { BlockchainInfo } from './shared/blockchaininfo.model'
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'api-monitor';
  blockChainInfo: any;
  i: number
  ApiStatus : ApiStatusInfo;
  ApiStatus1 :ApiStatusInfo;
  public chart : Chart 
  public chart1:Chart; 
  init : boolean

  ar : number[] ;
  testApiStatus : ApiStatusInfo[];

  apiEndpoints = [];
  apiCalls = [];
  apiHttpsEndpoints = [];
  apiHttpsCalls = [];

  TestApiArray = []

  addressForTesting : string = '1EhaYqsewUtZZxMWqTWBheyKrxN6sd9fbA'
  txidForTesting : string = '8bc6139478cbd342e154b43e83db476288d4aa6d9e1c71133be9551ee78a52ce'

  constructor(private api: ApiStatusService) {
    this.ar = [1,2,3,4,5,6,7,8,9,10];

    this.apiEndpoints.push("http://fabexplorer.info",
    "http://fabexplorer.com",
    "http://api.fabcoin.biz",
    "http://api1.fabcoin.club",
    "http://api2.fabcoin.club",
    "http://api3.fabcoin.club",
    "http://api1.fabexplorer.net",
    "http://api2.fabexplorer.net",
    "http://api3.fabexplorer.net")

    this.apiCalls.push(":9001/fabapi/getblockchaininfo",":9001/fabapi/existaddress/"+this.addressForTesting,":8666/transactions?address="+this.addressForTesting,":9001/fabapi/getrawtransaction/"+this.txidForTesting+'/true')

    for(let i = 0; i < this.apiEndpoints.length ; i++){
      for(let j = 0;j < this.apiCalls.length; j++) {
        this.TestApiArray.push(new ApiStatusInfo(this.apiEndpoints[i],this.apiCalls[j]))
      }
    }

    //Add https endpoints
    this.apiHttpsEndpoints.push("https://fabexplorer.info",
    "https://fabexplorer.com",
    "https://api.fabcoin.biz",
    "https://api1.fabcoin.club",
    "https://api2.fabcoin.club",
    "https://api3.fabcoin.club",
    "https://api1.fabexplorer.net",
    "https://api2.fabexplorer.net",
    "https://api3.fabexplorer.net")

    this.apiHttpsCalls.push(":9003/fabapi/getblockchaininfo",":9003/fabapi/existaddress/"+this.addressForTesting,/*":8666/transactions?address="+this.addressForTesting
    ,*/":9003/fabapi/getrawtransaction/"+this.txidForTesting+'/true')

    for(let i = 0; i < this.apiHttpsEndpoints.length ; i++){
      for(let j = 0;j < this.apiHttpsCalls.length; j++) {
        this.TestApiArray.push(new ApiStatusInfo(this.apiHttpsEndpoints[i],this.apiHttpsCalls[j]))
      }
    }
  }
}
