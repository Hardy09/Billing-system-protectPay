import {Component, OnInit, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {Chart,registerables} from 'chart.js';
//const labels = Utils.months({count: 7});

const chartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  chart : any;

  @ViewChild('myChart') private myChart!: ElementRef; // ViewChild can access element when the page has loaded so always use them in
  // ngAfterViewInit.

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'bar',
      data: chartData
    });


    // // @ts-ignore
    // let ctx : HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    // console.log(ctx);
    // // @ts-ignore
    // this.chart = new Chart(ctx, {
    //   type: 'bar',
    //   data: chartData
    // });
  }

}
