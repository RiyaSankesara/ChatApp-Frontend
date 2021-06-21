import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import {io} from 'socket.io-client';
import * as moment from 'moment';  

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;
  commentForm: FormGroup;
  postId: any;
  commentArray = [];
  posts: any;
  constructor(private fb: FormBuilder, private postService: PostService,
    private route: ActivatedRoute) { 
      this.socket = io('http://localhost:4000');
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
      console.log(data.posts[0].comments);
      this.posts = data.posts[0].post;
      // this.posts = data.posts[0];

      this.commentArray = data.posts[0].comments;
     // console.log(this.commentArray);
    });
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

}
