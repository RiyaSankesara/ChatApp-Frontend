import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  socket: any;
  constructor(private userService: UserService, private tokenService: TokenService) { 
    this.socket = io('http//:localhost:4000');
  }
  users = [];
  userArray = [];
  loggedInUser: any;
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
    const result = _.find(arr,['userFollowed._id',id]);
    if(result)
    {
      return true;
    }
    else{
      return false;
    }
  }

}
