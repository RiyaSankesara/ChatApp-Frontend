import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,AfterViewInit {
  toolbarElement: any;
  online_Users = [];
  constructor() { }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
  }
  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }
  online(event){
    this.online_Users = event;
  }
}
