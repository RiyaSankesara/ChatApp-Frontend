import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
   getUserByName(username: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${username}`);
  }
  followUser(id:any): Observable<any> { 
    return this.http.post(`${this.baseUrl}/follow-user`,{
      userFollowed : id
    });
  }
  unfollowUser(userFollowed:any): Observable<any> { 
    return this.http.post(`${this.baseUrl}/unfollow-user`,{
      userFollowed
    });
  }

}
