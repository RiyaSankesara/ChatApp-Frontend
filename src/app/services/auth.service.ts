import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: any;
  constructor(private http:HttpClient) {
    this.baseUrl = environment.baseUrl;
   }

  registerUser(body: any): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/RegisterUser`,body);
  }
  loginUser(body: any): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/Login`,body);
  }
}
