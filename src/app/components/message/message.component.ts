import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Socket } from 'ngx-socket-io';
import { CaretEvent, EmojiEvent } from "ngx-emoji-picker";
import _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() users;

  Receiver: string;
  ReceiverData: any;
  user: any;
  message: string;
  messageArray = [];
  typingMessage;
  typing = false;
  userArray = [];
  public eventMock;
  public eventPosMock;
  isOnline = false;

  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  public toggled = false;
  public content = ' ';

  private _lastCaretEvent: CaretEvent;

  constructor(private userService: UserService, private tokenService: TokenService,
    private msgService: MessageService, private route: ActivatedRoute,
    private socket: Socket) {

  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(
      params => {
        this.Receiver = params.name;
        setTimeout(() => {
          this.ReceiverData = this.getUserByUserName(this.Receiver);
          this.socket.on('refreshPage', (data: any) => {
            this.getAllmessage(this.user._id, this.ReceiverData._id);
          });
        }, 200);
      }
    );
    this.userArray = this.users;

    this.socket.on('is_typing', data => {

      if (data.sender === this.Receiver) {
        this.typing = true;
      }

    });
    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.Receiver) {
        this.typing = false;
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.ReceiverData != null) {
      const title = document.querySelector('nameCol');

      if (changes.users.currentValue.length > 0) {
        const result = _.indexOf(changes.users.currentValue, this.Receiver);
        if (result > -1) {
          this.isOnline = true;
          (title as HTMLElement).style.marginTop = '10px';
        }
        else {
          this.isOnline = false;
          (title as HTMLElement).style.marginTop = '20px';
        }
        console.log(changes);
      }
    }

  }
  ngAfterViewInit() {
    const params = {
      room1: this.user.username,
      room2: this.Receiver
    };
    this.socket.emit('refresh', params);
  }
  getUserByUserName(name) {
    this.userService.getUserByName(name).subscribe(data => {
      this.ReceiverData = data.users;
      this.getAllmessage(this.user._id, this.ReceiverData._id);
    })
  }
  sendMessage() {
    if (this.message) {
      this.msgService.sendMessage(this.user._id, this.ReceiverData._id, this.ReceiverData.username, this.message)
        .subscribe(data => {
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
    else {

    }

  }
  getAllmessage(senderId, receiverId) {
    this.msgService.getAllMessage(senderId, receiverId).subscribe(data => {
      this.messageArray = data.messages.message;
    })
  }
  IsTyping() {
    this.socket.emit('start_typing',
      {
        sender: this.user.username,
        receiver: this.Receiver
      });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.Receiver
      })
    }, 500);
  }
  HandleSelection(event: EmojiEvent) {
    this.content = this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);
    this.message = this.content;
    this.toggled = !this.toggled;
    this.content = '';

  }

  HandleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
  }
  Toggled() {
    this.toggled = !this.toggled;
  }
}
