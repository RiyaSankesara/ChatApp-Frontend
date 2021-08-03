import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl: any;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }

  sendMessage(senderId,receiverId,receiverName,message): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat-messages/${senderId}/${receiverId}`, {
        receiverId,
        receiverName,
        message
    });
  }
  getAllMessage(senderId,receiverId): Observable<any> {
    return this.http.get(`${this.baseUrl}/chat-messages/${senderId}/${receiverId}`);
  }
}
