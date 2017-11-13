import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  animation1: string;
  animation2: string;
  animation3: string;

  constructor() {
    this.animation1 = 'rotateY(0deg)';
    this.animation2 = 'rotateY(0deg)';
    this.animation3 = 'rotateY(0deg)';
  }

  ngOnInit() {
  }

  turnPage(index: number) {
    if (index === 1) {
      if (this.animation1 === 'rotateY(0deg)') {
        this.animation1 = 'rotateY(180deg)';
      } else {
        this.animation1 = 'rotateY(0deg)';
      }
    } else if (index === 2) {
      if (this.animation2 === 'rotateY(0deg)') {
        this.animation2 = 'rotateY(180deg)';
      } else {
        this.animation2 = 'rotateY(0deg)';
      }
    } else if (index === 3) {
      if (this.animation3 === 'rotateY(0deg)') {
        this.animation3 = 'rotateY(180deg)';
      } else {
        this.animation3 = 'rotateY(0deg)';
      }
    }
  }

  goto(name: string) {
    event.stopPropagation();

    if (name === 'xiao') {
      window.open('https://www.linkedin.com/in/alex-xiao-603986b7/');
    } else if (name === 'yan') {
      window.open('https://www.linkedin.com/in/yizhou-yan/');
    } else if (name === 'tien') {
      window.open('https://www.linkedin.com/in/tien-tran-6898387b/');
    }
  }
}
