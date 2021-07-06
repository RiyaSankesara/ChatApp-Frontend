import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { io } from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  user: any;
  notification = [];
  constructor(private tokenservice: TokenService,
    private userService: UserService,
    private socket: Socket) {

  }

  ngOnInit() {
    this.user = this.tokenservice.GetPayload();
    this.getUser(); 
  }
  getUser() {
    // this.userService.getUserByName(this.user._id).subscribe(data => {
    //   console.log(data);
    // });
    this.userService.getUserByName(this.user.username).subscribe(data => {
      this.notification = data.users.notifications.reverse();
      console.log(data);
    });
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }
  markNoti(data:any){
    this.userService.markNotification(data._id).subscribe(value => {
       this.socket.emit('refresh',{});
    })

    
  }
  deleteNoti(data:any){
    this.userService.markNotification(data._id,true).subscribe(value => {
      console.log(value);
      this.socket.emit('refresh',{});
   })
  }

}
