import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

// import {DataGrid} from '@material-ui/data-grid';

interface BillingInterface {
  billingType: string;
  amount: number;
  userId: string;
  date: string;
  index: number;
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit, AfterViewInit {
  userId: string = '';
  billsArray: BillingInterface[] = [];
  flag = false;

  displayedColumns: string[] = ['index', 'billingType', 'amount', 'date'];
  dataSource = new MatTableDataSource<BillingInterface>();


  @ViewChild(MatPaginator, {static: false})
  //paginator!: MatPaginator; // for static data do like this....

  // for dynamic data use setter...
  set paginator(value: MatPaginator) {
    if (this.dataSource.data.length > 0){
      console.log(2);
      //console.log(this.dataSource.paginator);
      this.dataSource.paginator = value;
      //console.log(this.dataSource.paginator);
    }
  }

  // ngAfterViewInit() is called after the view is initially rendered. This is why @ViewChild() depends on it.
  // You can't access view members before they are rendered

  @ViewChild(MatSort, {static: false})
  //sort!: MatSort;
  set sort(value: MatSort) {
    if (this.dataSource.data.length > 0){
      this.dataSource.sort = value;
    }
  }


  constructor(private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.billsArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //throw new Error('Method not implemented.');
  }


  async ngOnInit() {
    console.log('ngOnInit Called....');
    //console.log(this.route.snapshot.params);
    // this.userId = this.route.snapshot.params.id; // accessing path params...

    // accessing query params...
    this.route.queryParams.subscribe(params => {
      console.log('Routing data ', params);
      this.userId = params.userId;
    });
    console.log('IN BILLS CALLING FETCH USER BILLS');
    await this.fetchUsersBills().then((it) => {
      console.log('JCBJBoboeb', it);
      this.flag = it;
    });
  }

  async fetchUsersBills(): Promise<boolean> {
    //console.log(this.userId);
    let flag: boolean = false;
    const data = await axios.get(`http://localhost:3000/billingApp/bills/${this.userId}`).then((it: AxiosResponse) => {
      //console.log(it);
      if (it.data.result.length > 0) {
        it.data.result.forEach((val: BillingInterface, index: number) => {
          let date: Date = new Date(+val.date);
          val.date = date.getDate() +
            '/' + (date.getMonth() + 1) +
            '/' + date.getFullYear() +
            ' ' + date.getHours() +
            ':' + date.getMinutes() +
            ':' + date.getSeconds();
          //console.log(time);
          val.index = index + 1;
          this.billsArray.push(val);
          //console.log(val.index);
        });
        this.dataSource.data = this.billsArray; // we can define it here or we can define it during data source initialization
        console.log(1);
        flag = true;
      } else {
        console.log('No Bills for this User....');
        flag = false;
      }
    }).catch((error: string) => {
      console.log(error.toString());
      flag = false;
    });
    return flag;
  }

}
