import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  user:any;
  userArray: any;
  constructor(private tokenService: TokenService,private userService: UserService,private socket: Socket) { 

  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    })
  
  }
  getUser(){
    this.userService.getUserById(this.user._id).subscribe(data => 
      {
        this.userArray = data.users;
        console.log(this.userArray);
      })
  }
}
