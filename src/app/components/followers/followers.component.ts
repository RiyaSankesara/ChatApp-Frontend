import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  followers : any = [];
  user: any;
  socket: any;
  constructor(private tokenService : TokenService,private userService: UserService) { 
    this.socket = io('http://localhost:4000');
  }

  ngOnInit(): void {
    console.log("Test");
    this.user = this.tokenService.GetPayload();
    this.getUser();
  }
  
  getUser(){
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.followers = data.users.followers;
    }, err => {
      console.log(err);
    });
  }

}
