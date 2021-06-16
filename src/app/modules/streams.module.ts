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


@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[StreamsComponent],
  providers:[TokenService,PostService,CookieService]
})
export class StreamsModule { }