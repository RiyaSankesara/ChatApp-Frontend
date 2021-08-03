import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import _ from 'lodash';




@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit , AfterViewInit{
  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications = [];
  count = [];
  chatList = [];
  msgNum = 0;
  constructor(private tokenService: TokenService, private router: Router,
    private userService: UserService, private socket: Socket) { }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    const dropdownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.socket.emit('online',{
      room:'global',name: this.user.username
    });

    const dropdownElementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropdownElementTwo, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    })
  }
  getUser() {
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.users.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false])
      this.count = value;
      this.chatList = data.users.chatList;
      this.checkIfRead(this.chatList);
    }, err => {
      if (err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }
  ngAfterViewInit(){
    this.socket.on('usersOnline', data => {
      this.onlineUsers.emit(data);
    });
  }
  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }
  GotoHome() {
    this.router.navigate(["streams"]);
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }
  markAll() {
    this.userService.markAllasRead().subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    });
  }
  messageDate(data) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    });
  }
  checkIfRead(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (this.router.url !== `/chat/${receiver.sendername}`) {
        if (receiver.isRead === false && receiver.receivername === this.user.username) {
          checkArr.push(1);
          this.msgNum = _.sum(checkArr);
        }
      }
    }

  }
}
