import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  loggedInUser: any;
  following :any[] = [];
  user: any = "";
  constructor(private userService: UserService,
    private tokenService: TokenService,private socket: Socket
  ) {
    //this.socket = io('http://localhost:4000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    })
  }
  getUser() {
    this.userService.getUserById(this.user._id).subscribe(data => {
      console.log(data);
      this.following = data.users.following;
    }, err => {
      console.log(err);
    });
  }
  UnFollowUser(user: any) {
    this.userService.unfollowUser(user._id).subscribe(data => { 
      this.socket.emit('refresh', {}); 
    })
  }

}
