import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { io } from 'socket.io-client';
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
      console.log(data);
    });
  }

}
