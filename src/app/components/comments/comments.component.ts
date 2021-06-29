import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import {io} from 'socket.io-client';
import * as moment from 'moment';  
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;
  commentArray = [];
  commentDetails: any;
  posts: any;
  constructor(private fb: FormBuilder, private postService: PostService,
    private route: ActivatedRoute,private socket: Socket) { 
     //this.socket = io('http://localhost:4000');
    }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
    this.getPostById();
    this.socket.on('refreshPage',(data : any) => {
      this.getPostById();
    });
  }
  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }
  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }
  addComment() {
    console.log(this.commentForm.value);
    this.postService.addComment(this.postId,this.commentForm.value.comment).subscribe(
      data=> {
       this.socket.emit('refresh',{});
        this.commentForm.reset();
      }
    )
  }
  getPostById(){
    this.postService.getPostById(this.postId).subscribe(data => {
      console.log(data.data);
      console.log(data.data.comments);
     // console.log(data.posts[0].comments);
      this.posts = data.data.post;
      this.commentDetails = data.data.comments
      // const mapped = Object.keys(this.commentDetails).map(key => 
      //   console.log(this.commentDetails[key]));

    
      // // // // this.posts = data.posts[0];
      // // // this.commentDetails.push(data.posts)
      // // // //this.commentArray = data.posts[0].comments;
      // console.log(this.commentDetails);
    });
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }


}
export class commentDetail {
   username: string = "";
   createdAt: string = "";
   comment: string= "";
}
