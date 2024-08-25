import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  itemInView: number = 5;
  totalView: number = 10;

  constructor() {

  }

  ngOnInit() {

  }

}
