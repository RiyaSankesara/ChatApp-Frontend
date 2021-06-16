import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  addPost(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/post/add-post`, body);
  }
  getAllPost() : Observable<any>{
    return this.http.get(`${this.baseUrl}/post`);
  }
}
