import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userId: string = '60950d5226982b2f1842db72';
  inputVal = '';
  title = 'my-first-project';
  masterArray: string[] = ['Create', 'Foo', 'Bar'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

  arrayBind() {
    console.log('Hello');
    this.masterArray.push('Hardy');
    console.log(this.inputVal);

  }


}
