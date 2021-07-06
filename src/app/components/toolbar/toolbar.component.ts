import { Component, OnInit } from '@angular/core';
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
export class ToolbarComponent implements OnInit {
  user: any;
  notifications = [];
  count = [];
  constructor(private tokenService: TokenService,private router: Router,
    private userService: UserService,private socket: Socket) { }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    const dropdownElement = document.querySelector('.dropdown-trigger'); 
    M.Dropdown.init(dropdownElement,{
      alignment: 'right',
      hover:true,
      coverTrigger: false
    });
    this.getUser();
    this.socket.on('refreshPage', ()=> {
      this.getUser();
    })
  }
  getUser(){
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.users.notifications.reverse();
      const value = _.filter(this.notifications,['read',false])
      this.count = value;
    },err => {
      if(err.error.token === null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }
  logout(){
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }
  GotoHome(){
     this.router.navigate(["streams"]);
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }
  markAll(){
    this.userService.markAllasRead().subscribe(data => {
      console.log(data);
      this.socket.emit('refresh',{});
    });
  }
}
