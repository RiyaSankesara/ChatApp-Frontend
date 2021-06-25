import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  constructor(private userService: UserService, private tokenService: TokenService,
    private socket: Socket) {
  }
  users :any[] = [];;
  userArray :any[] = [];;
  loggedInUser: any;
  userDetails = new userDetails();
  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload();
    this.getUsers();
    this.getUserById();
    this.socket.on('refreshPage', () => {
      this.getUsers();
      this.getUserById();
    })
  }
  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      _.remove(data.users, { username: this.loggedInUser.username })
      this.users = data.users;
      console.log(this.users);
      this.userDetails._id = data.users.id;
      this.userDetails.username = data.users.username;
      console.log(this.userDetails);

    });
  }
  getUserById() {
    this.userService.getUserById(this.loggedInUser._id).subscribe(data => {
      this.userArray = data.users.following;
      // this.userArray = data.users;
    });
  }
  getUserByName(user: any) {
    this.userService.getUserByName(user.username).subscribe(data => {
      _.remove(data.users, { username: this.loggedInUser.username })
      this.users = data.users;
    });
  }
  followUser(user: any) {
    this.userService.followUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
      console.log(data);

    })
  }
  checkIsFollowing(arr: any, id: any) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    }
    else {
      return false;
    }
  }

}
class userDetails {
  username: string = "";
  _id: string = "";
}
