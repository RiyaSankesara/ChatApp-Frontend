import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe(data => {
      console.log(data.posts);
      this.posts = data.posts;
    });
  }
  TimeFromNow(time:any){
    return moment(time).fromNow();
  }

}
