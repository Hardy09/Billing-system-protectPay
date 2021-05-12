import {Component, Input, OnInit} from '@angular/core';

interface BillingInterface {
  billingType: string;
  amount: number;
  userId: string;
  date: string;
  index: number;
}

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.css']
})
export class ShowModalComponent implements OnInit {

  @Input() msgFromParent! : BillingInterface;

  constructor() {
    //console.log(this.msgFromParent);
  }

  ngOnInit(): void {
  }

}
