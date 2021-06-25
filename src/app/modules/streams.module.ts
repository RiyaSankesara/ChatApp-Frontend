import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UserService } from '../services/user.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';


@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [StreamsComponent],
  providers: [TokenService, PostService, CookieService,UserService]
})
export class StreamsModule { }
