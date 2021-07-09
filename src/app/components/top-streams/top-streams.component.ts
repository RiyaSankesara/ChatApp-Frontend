import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PostService } from 'src/app/services/post.service';
import { io } from 'socket.io-client';
import * as lodash  from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.scss']
})
export class TopStreamsComponent implements OnInit {

  topPosts: any = [];
  user:any;

  constructor(private postService: PostService,private tokenService: TokenService,
    private router: Router,private socket: Socket
    ) {
   // this.socket = io('http://localhost:4000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.getAllPosts();
    this.socket.on('refreshPage', (data: any) => {
      this.getAllPosts();
    });
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }
  getAllPosts() {
    this.postService.getAllPost().subscribe(data => {
      this.topPosts = data.top;
    }, err => {
      if(err.error.token === null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }
  likePost(post: any) {
    this.postService.addLike(post).subscribe(data => {
      this.socket.emit('refresh',"Hello Riya");
    }, err => {
      console.log(err);
    })
  }
  checkInLikesArray(arr: any, username: any) {
    return lodash.some(arr, { username: username });
  }
  openComponentBox(post: any){
    this.router.navigate(['post',post._id]);
  }
}
