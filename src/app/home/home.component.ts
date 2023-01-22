import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  open:boolean=false;
  constructor(){

  }

  onOpen(open: boolean) {
    this.open =open;
    console.log(" home component "+this.open);
    }


}
