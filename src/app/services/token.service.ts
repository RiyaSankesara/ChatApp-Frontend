import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}
  SetToken(token: any) {
    console.log(token);
    this.cookieService.set('chat_token', token);
  }
  GetToken(){
    return this.cookieService.get('chat_token');
  }
  DeleteToken(){
    return this.cookieService.delete('chat_token');
  }
  GetPayload(){
    const token = this.GetToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload)) //atob is convert to bace64 encoded string
    }

    return payload.data;
  }
}
