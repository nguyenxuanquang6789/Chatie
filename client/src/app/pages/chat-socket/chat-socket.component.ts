import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import * as io from 'socket.io-client/dist/socket.io';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss']
})
export class ChatSocketComponent implements OnInit {
  socket: any;
  message: any;
  userInfo:any;
  public listConver: Array<any>;
  readonly uri: string = "http://localhost:9999";

  constructor(private sock: ChatsocketioService, public userService: UserService, public auth: LoginService) {
    console.log("bug")
    this.socket = io(this.uri);

  }

  ngOnInit(): void {
    this.listen('message-broadcast').subscribe((data) => {
      console.log(data);
    });
    this.setupSocketConnection();
    this.getUserInfos()
  }

  public async getUserInfos(){
    await this.userService.getUserInfo(this.auth.user.email);
    this.userInfo = this.userService.user;
    console.log(this.userInfo.email);
  }

  public async getAllUserConver(){
    await this.userService.getAllConver();
    this.listConver = this.userService.listConver;
  }
  
  listen(eventName: string) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);

      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  setupSocketConnection() {
    // this.socket = io(this.uri);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }



  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'pink';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    // element.style.float = 'right';
    // element.style.width = 'fit-content';
    document.getElementById('message-list').appendChild(element);
  }


}