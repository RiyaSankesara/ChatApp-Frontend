import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PostService } from 'src/app/services/post.service';
import { io } from 'socket.io-client';
import * as lodash  from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any = [];
  socket: any;
  user:any;

  constructor(private postService: PostService,private tokenService: TokenService,
    private router: Router
    ) {
    this.socket = io('http://localhost:4000');
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
      this.posts = data.posts;
    }, err => {
      if(err.error.token === null){
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }
  likePost(post: any) {
    this.postService.addLike(post).subscribe(data => {
      this.socket.emit('refresh', {});
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
