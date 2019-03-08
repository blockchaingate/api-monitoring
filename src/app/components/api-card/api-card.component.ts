import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ApiStatusInfo, Api_Status } from '../../shared/ApiStatusInfo.model';
import { ApiStatusService } from '../../api-status.service';
import { Chart } from 'chart.js';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent {

  @Input('aa') aa;
  @Input('b') b;
  @Input('ApiStatus') ApiStatus: ApiStatusInfo;
  private chart: Chart;
  private chart_pi : Chart;
  private interval: number = 5000
  public apiCall : string;

  private isPlotInitialized = false;
  private apiErrorCount = 0;
  private apiSuccessCount = 0;


  constructor(private api: ApiStatusService) {


  }


  ngOnInit() {
    this.ApiStatus.API_Status = []
  //  console.log(this.ApiStatus)
    this.apiCall = (this.ApiStatus.API_Call.includes('existaddress')) ? 'ExistAddress' : (this.ApiStatus.API_Call.includes('getblockchaininfo')) ? 'blockchaininfo' : (this.ApiStatus.API_Call.includes('transactions')) ? 'UTXO Request' : 'getrawtransaction' 

  }

  async  delay(ms: number) {
    return new Promise(resolve => setTimeout(() => { resolve }, ms))
  }

  async ngAfterViewInit() {
    //this.initPlot()
    setTimeout(() => {
      setInterval(() => {
        this.pingApi();
        console.log(this.interval * this.aa / 36)
      }, this.interval)
    }, this.interval * this.aa / 36)

  }

  updatePlot() {


    if (!this.isPlotInitialized) {
      var ctx = document.getElementById('canvas_' + Number(this.aa).toString());
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Time',
            yAxisID: 'Time',
            data: [],
            borderColor: "#3cba9f"
          }, {
            label: 'Status',
            yAxisID: 'Status',
            data: [],
            borderColor: "rgb(255,155,0)"
          }]
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                labelString: 'Time (ms)'
              },
              id: 'Time',
              type: 'linear',
              position: 'left',
            }, {
              id: 'Status',
              type: 'linear',
              position: 'right',
              ticks: {
                max: 1,
                min: 0
              }
            }]
          }
        }
      })

      var ctx1 = document.getElementById('canvas_pi_' + Number(this.aa).toString());
      this.chart_pi = new Chart(ctx1,{
        type:'pie',
        data : {
          datasets: [{
              data: [0,0],
              backgroundColor : ['rgb(150,255,150)','rgb(255,150,150)']
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              'Success',
              'Error'
          ]
      }
      })

      this.isPlotInitialized = true
    }


    let resTime = this.ApiStatus.API_Status.map(res => res.response_time)
    let status = this.ApiStatus.API_Status.map(res => res.status)
    let date = this.ApiStatus.API_Status.map(res => { return new Date(res.time).toLocaleTimeString() })

    this.chart.data.labels.push(date[date.length - 1])
    this.chart.data.datasets[0].data.push(resTime[resTime.length - 1])
    this.chart.data.datasets[1].data.push(status[status.length - 1])

    this.chart_pi.data.datasets[0].data = [this.apiSuccessCount,this.apiErrorCount]

    if (this.chart.data.labels.length > 25) this.chart.data.labels.shift();
    if (this.chart.data.datasets[0].data.length > 25) this.chart.data.datasets[0].data.shift();
    if (this.chart.data.datasets[1].data.length > 25) this.chart.data.datasets[1].data.shift();

    this.chart.update()
    this.chart_pi.update()


  }


  pingApi() {
    let t0 = new Date().valueOf()
    this.api.checkApi(this.ApiStatus.API_Endpoint + this.ApiStatus.API_Call)
      .subscribe(res => {
        let t1 = new Date().valueOf()

        let a = new Api_Status();
        a.status = 1
        a.response_time = t1 - t0
        a.time = t0
        this.apiSuccessCount++;
        this.ApiStatus.API_Status.push(a)
        this.updatePlot()

      },
        error => {
          let t1 = new Date().valueOf()

          let a = new Api_Status();
          a.status = 0
          a.response_time = t1 - t0
          a.time = t0
          this.apiErrorCount++;
          this.ApiStatus.API_Status.push(a)
          console.log("There was an error", (t1 - t0))
          this.updatePlot()

        })
  }
}
